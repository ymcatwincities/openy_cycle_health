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
   * Entity type manager instance.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  protected $_userGroupId;

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
  protected abstract  function prepareExercisesArray();

  /**
   * {@inheritdoc}
   */
  public function build() {
    $game_nid = $this->getCurrentGameNid();
    if (empty($game_nid)) {
      return [];
    }

    $exercises_array = $this->prepareExercisesArray();

    $login = '';
    $user = $this->currentUser->getAccount();
    if ($user->id()) {
      $userData = User::load($user->id());
      $first_name = $userData->field_first_name->value;
      $login = (!empty($first_name)) ? $first_name : $user->getEmail();
    }

    return [
      '#game_nid' => $game_nid,
      '#excercises' => $exercises_array,
      '#cache' => [
        'tags' => $this->getCacheTags(),
        'contexts' => $this->getCacheContexts(),
        'max-age' => $this->getCacheMaxAge(),
      ],
      '#attached' => [
        'drupalSettings' => [
          'username' => $login,
        ],
      ],
    ];
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
  }

  /**
   * @return string
   */
  function getCurrentGameNid() {
    if (isset($this->_currentGameNid)) {
      return $this->_currentGameNid;
    }

    $game_nid = 0;
    $user_group_id = $this->getCurrentUserGroupId();
    $games = $this->configFactory
      ->get($this->getGameConfigurationName())
      ->get('items');

    $today = date('Y-m-d');
    foreach ($games as $game) {
      if ($today == $game['date'] && $game['user_group'] == $user_group_id) {
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
  protected function getCurrentUserGroupId() {
    if (isset($this->_userGroupId)) {
      return $this->_userGroupId;
    }

    $user_group_id = 0;

    if ($node = $this->routeMatch->getParameter('node')) {
      foreach ($node->field_content as $paragraph_ref) {
        $paragraph = $paragraph_ref->entity;

        if ($paragraph->bundle() != $this->getGameParagraphBundle()) {
          continue;
        }

        $user_group_id = $paragraph->field_user_group->target_id;
        $this->_userGroupId = $user_group_id;
      }
    }

    return $user_group_id;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $game_nid = $this->getCurrentGameNid();
    $user_group_id = $this->getCurrentUserGroupId();

    return Cache::mergeTags(parent::getCacheTags(), [
      'game_nid' . $game_nid,
      'user_group_id' . $user_group_id,
    ]);
  }
}
