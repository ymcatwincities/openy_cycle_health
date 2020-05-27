<?php
namespace Drupal\twelve_user\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\twelve_user\Family;
use Drupal\user\UserInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides Dashboard controller.
*/
class Dashboard extends ControllerBase {

  /**
   * @var \Drupal\twelve_user\Family
   */
  protected $family;

  /**
   * Constructs a new Dashboard object.
   *
   * @param \Drupal\twelve_user\Family $family
   */
  public function __construct(Family $family) {
    $this->family = $family;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('twelve_user.family')
    );
  }

  /**
   * Render method for /user/{user}/achievements
   *
   * @param \Drupal\user\UserInterface $user
   * @return array
   */
  public function getUserAchievements(UserInterface $user) {
    return [
      '#theme' => 'user-achievements',
      '#badges_list' => $this->family->getUserRecentsBadges(),
      '#uid' => $user->id()
    ];
  }

  /**
   * Render method for /user/{user}/art-collection
   *
   * @param \Drupal\user\UserInterface $user
   * @return array
   */
  public function getUserArtCollection(UserInterface $user) {
    return [
      '#theme' => 'user-art-collection',
      '#badges_list' => $this->family->getUserHiddenImageBadges(),
      '#uid' => $user->id()
    ];
  }

}
