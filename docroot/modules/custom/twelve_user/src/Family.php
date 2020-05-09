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

  public function __construct(PrivateTempStoreFactory $temp_store_factory, AccountProxyInterface $current_user) {
    $this->tempStore = $temp_store_factory->get('user_family');
    $this->currentUser = $current_user;
  }

  /**
   * @return string
   */
  public function getActivePlayerNid() {
    return $this->tempStore->get('player');
  }

  /**
   * @param $nid integer
   *
   * @throws \Drupal\Core\TempStore\TempStoreException
   */
  public function setActivePlayerNid($nid) {
    $this->tempStore->set('player', $nid);
  }

  public function getActivePlayerName() {
    $account = $this->currentUser->getAccount();

    if (!$account->id()) {
      return '';
    }

    $userData = User::load($account->id());
    $first_name = $userData->field_first_name->value;
    return (!empty($first_name)) ? $first_name : $account->getEmail();
  }
}
