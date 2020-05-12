<?php
namespace Drupal\twelve_user;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\user\Entity\User;

/**
 * Service Class Family
 *
 * @package Drupal\twelve_user
 */
class Family {

  /**
   * The tempstore object.
   *
   * @var \Drupal\Core\TempStore\SharedTempStore
   */
  protected $tempStore;

  /**
   * Current user service instance.
   *
   * @var AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Family constructor.
   *
   * @param \Drupal\Core\TempStore\PrivateTempStoreFactory $temp_store_factory
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   */
  public function __construct(PrivateTempStoreFactory $temp_store_factory, AccountProxyInterface $current_user) {
    $this->tempStore = $temp_store_factory->get('user_family');
    $this->currentUser = $current_user;
  }

  /**
   * @return string
   */
  public function getActivePlayerName() {
    $user = $this->getUser();
    if (!$user) {
      return '';
    }

    $sub_account = $user->get('field_active_family_member')->entity;
    if ($sub_account) {
      return $sub_account->title->value;
    }

    $first_name = $user->field_first_name->value;
    return (!empty($first_name)) ? $first_name : $user->field_email->value;
  }

  /**
   * @return int|null
   */
  public function getSubAccountId() {

    $user = $this->getUser();
    if (!$user) {
      return '';
    }

    return $user->field_active_family_member->target_id;
  }

  /**
   * @return bool|User
   */
  public function getUser() {
    $account = $this->currentUser->getAccount();
    if (!$account->id()) {
      return FALSE;
    }

    $user = User::load($account->id());
    return $user;
  }
}
