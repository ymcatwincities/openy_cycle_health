<?php

namespace Drupal\twelve_app\Plugin\Block;


use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
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
 *   id = "today_progress",
 *   admin_label = @Translation("12 bursts today progress"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class TodayProgress extends BlockBase implements ContainerFactoryPluginInterface {

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
    AccountProxyInterface $current_user
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
    $this->entityQuery = $entity_query;
    $this->aliasManager = $alias_manager;
    $this->routeMatch = $route_match;
    $this->currentUser = $current_user;
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
      $container->get('current_user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $exercises_array = [];

    $items = $this->configFactory
      ->get('twelve_app.settings')
      ->get('items');

    $today = date('Y-m-d');
    foreach ($items as $item) {
      if ($today == $item['date']) {
        $node_id = $item['node_id'];
        continue;
      }
    }

    if (!empty($node_id)) {
      $landing_page = Node::load($node_id);

      foreach ($landing_page->field_content as $paragraph_ref) {
        /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
        $paragraph = $paragraph_ref->entity;

        if ($paragraph->bundle() == '12_bursts_container') {
          foreach ($paragraph->field_excercises as $excercise_reference) {
            /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $excercise_reference */
            $exercise_entity = $excercise_reference->entity;
            $exercises_array[] = [
              'label' => $exercise_entity->title->value,
              'description' => $exercise_entity->body->value,
              'timer' => $exercise_entity->field_timer->value,
              'gif' => $exercise_entity->field_animation->value,
              'id' => $exercise_entity->id(),
            ];
          }
        }
      }

      $completion_node_url = '';
      $completion_node_id = $this->configFactory
        ->get('twelve_app.settings')
        ->get('completion_node_id');
      if (!empty($completion_node_id)) {
        $completion_page = Node::load($completion_node_id);
        $completion_node_url = $completion_page->toUrl()->toString();
      }

      $user = $this->currentUser->getAccount();
      $login = '';

      if ($user->id()) {
        $userData = User::load($user->id());
        $first_name = $userData->field_first_name->value;
        $login = (!empty($first_name)) ? $first_name : $user->getEmail();
      }

      return [
        '#theme' => 'today_progress',
        '#excercises' => $exercises_array,
        '#current_nid' => $node_id,
        '#completion_url' => $completion_node_url,
        '#cache' => [
          'tags' => $this->getCacheTags(),
          'contexts' => $this->getCacheContexts(),
          'max-age' => $this->getCacheMaxAge(),
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
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $node_id = $this->configFactory
      ->get('twelve_app.settings')
      ->get('node_id');

    return Cache::mergeTags(parent::getCacheTags(), ['twelve_app' . $node_id]);
  }

}
