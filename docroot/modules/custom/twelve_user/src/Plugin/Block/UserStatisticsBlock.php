<?php

namespace Drupal\twelve_user\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Database\Connection;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\twelve_user\Family;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Block(
 *   id = "user_statistics_block",
 *   admin_label = @Translation("User Statistics Block"),
 * )
 */
class UserStatisticsBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * @var Family
   */
  protected $family;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    Family $family
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
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
      $container->get('twelve_user.family')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $streaks = $this->family->signInStreaks();
    return [
      '#theme' => 'user-statistics',
      '#lifetime_bursts' => $this->family->lifeTimeBurstsCount(),
      '#signin_streak' => $streaks['last_streak'],
      '#max_signin_streak' => $streaks['max_streak'],
      '#art_collector' => $this->family->hiddenImageBadgeCount(),
      '#bingo_champion' => $this->family->bingoBadgeCount(),
      '#cache' => [
        'max-age' => 0
      ]
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    $contexts = parent::getCacheContexts();
    $contexts[] = 'user';
    return $contexts;
  }

}
