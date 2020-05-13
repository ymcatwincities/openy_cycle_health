<?php
namespace Drupal\twelve_app\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\twelve_user\Family;

abstract class GameAbstract extends BlockBase implements ContainerFactoryPluginInterface {

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
   * @var Family
   */
  protected $family;

  /**
   * Entity type manager instance.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  protected $_gameCategoryId;

  protected $_currentGameNid;



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
    EntityTypeManagerInterface $entityTypeManager,
    Family $family
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
    $this->entityQuery = $entity_query;
    $this->aliasManager = $alias_manager;
    $this->routeMatch = $route_match;
    $this->currentUser = $current_user;
    $this->entityTypeManager = $entityTypeManager;
    $this->family = $family;
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
      $container->get('entity_type.manager'),
      $container->get('twelve_user.family')
    );
  }

  /**
   * @return string
   */
  public abstract function getGameConfigurationName();

  /**
   * @return string
   */
  public abstract function getGameParagraphBundle();

  /**
   * @return string
   */
  public abstract function getGameExercisesParagraphBundle();

  /**
   * @return array
   */
  protected abstract function prepareExercisesArray();

  /**
   * Helper method that finds results for the current user.
   *
   * @return \Drupal\Core\Entity\EntityInterface|mixed|null
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  protected function getUserProgressNode() {

    $query_arr = [
      'uid' => $this->currentUser->getAccount()->id(),
      'field_when' => $this->getCurrentGameNid(),
    ];

    if (!empty($this->family->getSubAccountId())) {
      $query_arr['field_sub_user'] = $this->family->getSubAccountId();
    }

    $nodes = $this->entityTypeManager->getStorage('node')
      ->loadByProperties($query_arr);

    if (!empty($nodes)) {
      return reset($nodes);
    }

    return NULL;
  }

  /**
   * @return string[]
   */
  public function getFinishedExercisesNids() {
    $result = [];

    $progress_node = $this->getUserProgressNode();
    if ($progress_node !== NULL) {
      $finished_exercises = $progress_node
        ->get('field_finished_items')->getValue();

      foreach ($finished_exercises as $item) {
        $result[] = $item['target_id'];
      }
    }

    return $result;
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    $game_nid = $this->getCurrentGameNid();

    if (empty($game_nid)) {
      return [];
    }

    return [
      '#debug' => $this->isUserAdmin(),
      '#game_nid' => $game_nid,
      '#excercises' => $this->prepareExercisesArray(),
      '#cache' => [
        'tags' => $this->getCacheTags(),
        'contexts' => $this->getCacheContexts(),
        'max-age' => $this->getCacheMaxAge(),
      ],
      '#attached' => [
        'drupalSettings' => [
          'username' => $this->family->getActivePlayerName(),
          'sub_account_id' => $this->family->getSubAccountId()
        ],
      ],
    ];

  }

  /**
   * @return boolean
   */
  function isUserAdmin() {
    $roles = $this->currentUser->getAccount()->getRoles();
    return in_array('administrator', $roles);
  }

  /**
   * @return \Drupal\paragraphs\Entity\Paragraph|FALSE
   */
  function findGameExercisesParagraph() {
    $game_nid = $this->getCurrentGameNid();

    if (empty($game_nid)) {
      return FALSE;
    }

    $landing_page = Node::load($game_nid);
    foreach ($landing_page->field_content as $paragraph_ref) {
      /** @var \Drupal\paragraphs\Entity\Paragraph $paragraph */
      $paragraph = $paragraph_ref->entity;
      if ($paragraph->bundle() == $this->getGameExercisesParagraphBundle()) {
        return $paragraph;
      }
    }

    return FALSE;
  }

  /**
   * @return string
   */
  function getCurrentGameNid() {
    if (isset($this->_currentGameNid)) {
      return $this->_currentGameNid;
    }

    $game_nid = 0;
    $game_category_id = $this->getCurrentGameCategoryId();
    $games = $this->configFactory
      ->get($this->getGameConfigurationName())
      ->get('items');

    $today = date('Y-m-d');
    foreach ($games as $game) {
      if ($today == $game['date'] && $game['game_category'] == $game_category_id) {
        $game_nid = $game['node_id'];
        $this->_currentGameNid;
        break;
      }
    }

    return $game_nid;
  }

  /**
   * @return string
   */
  protected function getCurrentGameCategoryId() {
    if (isset($this->_gameCategoryId)) {
      return $this->_gameCategoryId;
    }

    $game_category_id = 0;

    if ($node = $this->routeMatch->getParameter('node')) {
      foreach ($node->field_content as $paragraph_ref) {
        $paragraph = $paragraph_ref->entity;

        if ($paragraph->bundle() != $this->getGameParagraphBundle()) {
          continue;
        }

        $game_category_id = $paragraph->field_game_category->target_id;
        $this->_gameCategoryId = $game_category_id;
      }
    }

    return $game_category_id;
  }

  /**
   * @return \Drupal\Core\Entity\EntityInterface|NULL
   */
  protected function getUserProgressNode() {
    $nodes = $this->entityTypeManager->getStorage('node')
      ->loadByProperties([
        'uid' => $this->currentUser->getAccount()->id(),
        'field_when' => $this->getCurrentGameNid(),
      ]);

    if (!empty($nodes)) {
      return reset($nodes);
    }

    return NULL;
  }

  /**
   * @return string[]
   */
  protected function getFinishedExercisesNids() {
    $result = [];

    $progress_node = $this->getUserProgressNode();
    if ($progress_node !== NULL) {
      $finished_exercises = $progress_node
        ->get('field_finished_items')->getValue();

      foreach ($finished_exercises as $item) {
        $result[] = $item['target_id'];
      }
    }

    return $result;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $game_nid = $this->getCurrentGameNid();
    $game_category_id = $this->getCurrentGameCategoryId();

    return Cache::mergeTags(parent::getCacheTags(), [
      'game_nid' . $game_nid,
      'game_category_id' . $game_category_id,
    ]);
  }
}
