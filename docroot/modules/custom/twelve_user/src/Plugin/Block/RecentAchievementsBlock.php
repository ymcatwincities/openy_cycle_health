<?php
namespace Drupal\twelve_user\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\twelve_user\Family;

/**
 * @Block(
 *   id = "recent_achievements_block",
 *   admin_label = @Translation("Recent Achievements Block"),
 * )
 */
class RecentAchievementsBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * @var Family
   */
  protected $family;

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
    AccountProxyInterface $current_user,
    Family $family
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->currentUser = $current_user;
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
      $container->get('current_user'),
      $container->get('twelve_user.family')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    return [
      '#theme' => 'recent-achievements',
      '#badges_list' => $this->family->getUserRecentsBadges(6),
      '#uid' => $this->currentUser->id(),
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
