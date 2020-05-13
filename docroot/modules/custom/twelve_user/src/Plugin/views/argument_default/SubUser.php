<?php

namespace Drupal\twelve_user\Plugin\views\argument_default;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheableDependencyInterface;
use Drupal\user\Entity\User;
use Drupal\views\Plugin\views\argument_default\ArgumentDefaultPluginBase;

/**
 * Sub user argument plugin
 *
 * @ViewsArgumentDefault(
 *   id = "sub_user",
 *   title = @Translation("Twelve: sub user")
 * )
 */
class SubUser extends ArgumentDefaultPluginBase implements CacheableDependencyInterface {

  /**
   * {@inheritdoc}
   */
  public function getArgument() {
    $uid = \Drupal::currentUser()->id();
    $user = User::load($uid);
    $target_id = $user->field_active_family_member->target_id;

    if (empty($target_id)) {
      $target_id = 'all';
    }

    return $target_id;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheMaxAge() {
    return Cache::PERMANENT;
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    return ['user'];
  }

}
