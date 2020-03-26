<?php

namespace Drupal\twelve_app\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\openy_activity_finder\OpenyActivityFinderSolrBackend;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Activity Finder' block.
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
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    ConfigFactoryInterface $config_factory,
    QueryFactory $entity_query,
    AliasManagerInterface $alias_manager,
    RouteMatchInterface $route_match
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->configFactory = $config_factory;
    $this->entityQuery = $entity_query;
    $this->aliasManager = $alias_manager;
    $this->routeMatch = $route_match;
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
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    return [
      '#theme' => 'today_progress',
      '#excercises' => [
        1 => [
          'label' => 'Push ups',
          'description' => 'Description here'
        ],
        2 => [
          'label' => 'Jumps',
          'description' => 'Do jumps all day until you die'
        ]
      ],

      '#cache' => [
        'tags' => $this->getCacheTags(),
        'contexts' => $this->getCacheContexts(),
        'max-age' => $this->getCacheMaxAge(),
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags() {
    return Cache::mergeTags(parent::getCacheTags(), ['twelve_app']);
  }

}
