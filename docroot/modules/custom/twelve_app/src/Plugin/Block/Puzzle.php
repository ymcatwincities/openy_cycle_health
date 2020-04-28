<?php

namespace Drupal\twelve_app\Plugin\Block;


use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\openy_activity_finder\OpenyActivityFinderSolrBackend;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Today Progress' block.
 *
 * @Block(
 *   id = "twelve_puzzle",
 *   admin_label = @Translation("Hidden Picture app"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class Puzzle extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * The configuration factory.
   *
   * @var ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The entity query factory.
   *
   * @var QueryFactory
   */
  protected $entityQuery;

  /**
   * The alias manager that caches alias lookups based on the request.
   *
   * @var AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The route match.
   *
   * @var RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * Current user service instance.
   *
   * @var AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Entity type manager instance.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ConfigFactoryInterface $config_factory,
    QueryFactory $entity_query,
    AliasManagerInterface $alias_manager,
    RouteMatchInterface $route_match,
    AccountProxyInterface $current_user,
    EntityTypeManagerInterface $entityTypeManager
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
    $this->entityQuery = $entity_query;
    $this->aliasManager = $alias_manager;
    $this->routeMatch = $route_match;
    $this->currentUser = $current_user;
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory'),
      $container->get('entity.query'),
      $container->get('path.alias_manager'),
      $container->get('current_route_match'),
      $container->get('current_user'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $exercises_array = [];

    $game_nid = $this->getCurrentGameNid();

    if (!empty($game_nid)) {
      $landing_page = Node::load($game_nid);

      foreach ($landing_page->field_content as $paragraph_ref) {
        /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
        $paragraph = $paragraph_ref->entity;

        if ($paragraph->bundle() == 'puzzle_container') {
          foreach ($paragraph->field_items as $puzzle_item_reference) {
            /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $puzzle_item_reference */
            $puzzle_item_paragraph = $puzzle_item_reference->entity;
            $exercise_entity = $puzzle_item_paragraph->field_exercise->entity;
            $media_entity = $puzzle_item_paragraph->field_prgf_image->entity;
            $media_file_uri = $media_entity->field_media_image->entity->getFileUri();
            $puzzle_image_url = file_create_url($media_file_uri);
            /** @var \Drupal\media\Entity\Media $media_entity */
            $exercises_array[] = [
              'label' => $exercise_entity->title->value,
              'description' => $exercise_entity->body->value,
              'timer' => $exercise_entity->field_timer->value,
              'gif' => $exercise_entity->field_animation->value,
              'id' => $exercise_entity->id(),
              'puzzle_image_url' => $puzzle_image_url
            ];
          }
        }
      }

      $user = $this->currentUser->getAccount();
      $login = '';
      $finished_items = [];
      $progress_nid = 0;

      if ($user->id()) {
        $userData = User::load($user->id());
        $first_name = $userData->field_first_name->value;
        $login = (!empty($first_name)) ? $first_name : $user->getEmail();

        $finished_items = $this->getCurrentFinishedItems($user->id(), $game_nid);
        $progress_node = $this->getUserProgressNode($user->id(), $game_nid);
        if ($progress_node !== NULL) {
          $progress_nid = $progress_node->id();
        }
      }

      return [
        '#theme' => 'puzzle',
        '#excercises' => $exercises_array,
        '#game_nid' => $game_nid,
        '#progress_nid' => $progress_nid,
        '#finished_items' => $finished_items,

        '#cache' => [
          'tags' => $this->getCacheTags(),
          'contexts' => $this->getCacheContexts(),
          // Temporary disable cache.
          'max-age' => 0,
        ],
        '#attached' => [
          'drupalSettings' => [
            'username' => $login,
          ]
        ],
      ];

    } else {
      return [];
    }
  }

  /**
   * @param $user_id
   * @param $node_id
   */
  private function getUserProgressNode($user_id, $node_id) {
    $nodes = $this->entityTypeManager->getStorage('node')
      ->loadByProperties([
        'uid' => $user_id,
        'field_when' => $node_id
      ]);

    if (!empty($nodes)) {
      return reset($nodes);
    }

    return NULL;
  }

  /**
   * Private function that calculates results for current user.
   *
   * @param $user_id
   * @param $node_id
   *
   * @return array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  private function getCurrentFinishedItems($user_id, $node_id) {
    $result = [];

    $node = $this->getUserProgressNode($user_id, $node_id);
    if ($node !== NULL) {
      $finished_exercises = $node->get('field_finished_items')->getValue();

      foreach ($finished_exercises as $item) {
        $result[] = $item['target_id'];
      }

    }

    return $result;
  }

  /**
   * Function that calculates current schedule node.
   *
   * @return int
   */
  private function getCurrentGameNid() {

    $node_id = 0;

    $items = $this->configFactory
      ->get('twelve_app.puzzle_settings')
      ->get('items');

    $today = date('Y-m-d');
    foreach ($items as $item) {
      if ($today == $item['date']) {
        $node_id = $item['node_id'];
        continue;
      }
    }

    return $node_id;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $node_id = $this->getCurrentGameNid();
    $user_id = $this->currentUser->id();

    return Cache::mergeTags(parent::getCacheTags(), [
      'puzzle_app' . $node_id,
      'user_id' . $this->currentUser->id(),
      'finished_items' . count($this->getCurrentFinishedItems($user_id, $node_id))
    ]);
  }

}
