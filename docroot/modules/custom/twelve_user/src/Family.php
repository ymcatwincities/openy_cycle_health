<?php
namespace Drupal\twelve_user;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

/**
 * Service Class Family
 *
 * @package Drupal\twelve_user
 */
class Family {

  /**
   * Badge vocabulary.
   */
  const BADGE_VID = 'badges';

  /**
   * Current user service instance.
   *
   * @var AccountProxyInterface
   */
  protected $currentUser;

  /**
   * @var Connection
   */
  protected $database;

  protected $entity_type_manager;

  /**
   * @var int
   */
  protected $_subAccountId = null;


  protected $_badge_types = null;

  /**
   * Family constructor.
   *
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   * @param \Drupal\Core\Database\Connection $database
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  public function __construct(AccountProxyInterface $current_user, Connection $database, EntityTypeManagerInterface $entity_type_manager) {
    $this->currentUser = $current_user;
    $this->database = $database;
    $this->entity_type_manager = $entity_type_manager;
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
    if (!is_null($this->_subAccountId)) {
      return $this->_subAccountId;
    }

    $user = $this->getUser();
    if (!$user) {
      return '';
    }

    $this->_subAccountId = $user->field_active_family_member->target_id;
    return $this->_subAccountId;
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

  /**
   * Lifetime Bursts Count
   * @return int
   */
  public function lifeTimeBurstsCount() {

    $query = $this->database->select('node__field_finished_items', 'fin_items');
    $query->fields('fin_items', ['field_finished_items_target_id']);
    $query->innerJoin('node_field_data', 'n', 'n.nid = fin_items.entity_id');
    $query->innerJoin('node__field_when', 'w', 'w.entity_id=fin_items.entity_id');
    $query->innerJoin('paragraphs_item_field_data', 'p', 'p.parent_id = w.field_when_target_id');
    $query->innerJoin('node__field_sub_user', 'su', 'su.entity_id = fin_items.entity_id');
    $query->where('n.uid = :uid', [':uid' => $this->currentUser->id()]);
    $query->where('p.type = :type', [':type' => '12_bursts_container']);
    $query->where('p.parent_type = :ptype', [':ptype' => 'node']);
    $query->where('p.parent_field_name = :field_name', [':field_name' => 'field_content']);
    $query->fields('n', ['nid', 'title']);
    if ($sub_account_id = $this->getSubAccountId()) {
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    } else {
      $query->where('su.field_sub_user_target_id is NULL');
    }
    $query->groupBy('n.nid');
    $query->groupBy('fin_items.field_finished_items_target_id');

    return $query->countQuery()->execute()->fetchField();
  }

  /**
   * Returns signin streaks as ['max_streak' => $max_streak, 'last_streak' => $last_streak]
   * @return int[]
   */
  public function signInStreaks() {

    $date = strtotime('-3 month');

    $query = $this->database->select('node');
    $query->leftJoin('node_revision', 'nr', 'node.nid=nr.nid');
    $query->where('node.type = :type and nr.revision_uid = :uid', [':type'=>'12_bursts_result', ':uid'=>$this->currentUser->id()]);
    $query->where('nr.revision_timestamp > :ts' , [':ts' => $date]);
    $query->orderBy('date_formatted', 'DESC');
    $query->addExpression('DATE_FORMAT(FROM_UNIXTIME(nr.revision_timestamp), \'%e %b %Y\')', 'date_formatted');
    $query->groupBy('date_formatted');

    $query->leftJoin('node__field_sub_user', 'su', 'su.entity_id=node.nid');
    if ($sub_account_id = $this->getSubAccountId()) {
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    } else {
      $query->where('su.field_sub_user_target_id is NULL');
    }

    $date_list = $query->execute()->fetchCol();

    $last_streak_finished = false;
    $last_streak = 0;
    $max_streak = 0;

    if (count($date_list) > 0) {
      $max_streak = 1;
      $last_streak = 1;
    }

    if (count($date_list) > 1) {
      $cur_streak = 1;
      for ($i = 1; $i < count($date_list); $i++) {
        $prev = date_create($date_list[$i - 1]);
        $curr = date_create($date_list[$i]);
        if (!$last_streak_finished && $prev->diff($curr)->days == 1) {
          $last_streak++;
        }
        else {
          $last_streak_finished = TRUE;
          if ($last_streak > $max_streak) {
            $max_streak = $last_streak;
          }
        }

        if ($prev->diff($curr)->days == 1) {
          $cur_streak++;
          if ($cur_streak > $max_streak) {
            $max_streak = $cur_streak;
          }
        }
        else if ($cur_streak > 1) {
          $cur_streak = 1;
        }
      }
    }

    return ['max_streak' => $max_streak, 'last_streak' => $last_streak];
  }

  /**
   * Get count of hidden image badges.
   *
   * @return int
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function hiddenImageBadgeCount() {
    return count($this->getHiddenImageBadgeIds());
  }

  /**
   * Get list of hidden picture badges
   *
   * @return int
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getHiddenImageBadgeIds() {
     return $this->badgeListQuery('Hidden Picture');
  }

  /**
   * @return \Drupal\Core\Entity\EntityBase[]|\Drupal\Core\Entity\EntityInterface[]
   */
  function getUserHiddenImageBadges() {
    $ids = $this->getHiddenImageBadgeIds();
    $nids = [];
    foreach ($ids as $id_arr) {
      $nids[] = $id_arr->nid;
    }

    if (empty($nids)) {
      return [];
    }

    return Node::loadMultiple($nids);
  }

  /**
   * @param $name
   *
   * @return int
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  private function badgeListQuery($name) {

    $tid = null;
    $badge_types = $this->getBadgeTypes();
    foreach ($badge_types as $term) {
      if ($term->name == $name) {
        $tid = $term->tid;
      }
    }

    if (is_null($tid)) {
      return 0;
    }

    $query = $this->database->select('node__field_results', 'results');
    $query->innerJoin('node__field_badge_type', 'badge', 'results.entity_id = badge.entity_id');
    $query->innerJoin('node_field_data', 'n', 'n.nid=results.entity_id');
    $query->where('n.uid = :uid', [':uid' => $this->currentUser->id()]);
    $query->where('badge.field_badge_type_target_id = :tid', [':tid' => $tid]);
    $query->fields('n', ['nid', 'title']);

    $query->leftJoin('node__field_sub_user', 'su', 'su.entity_id=results.field_results_target_id');
    if ($sub_account_id = $this->getSubAccountId()) {
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    } else {
      $query->where('su.field_sub_user_target_id is NULL');
    }
    return $query->execute()->fetchAllAssoc('nid');
  }

  /**
   * Returns bingo badge count
   * @return int
   */
  public function bingoBadgeCount() {
    return count($this->badgeListQuery('Bingo'));
  }

  /**
   * Get badge types from vocabulary.
   *
   * @return |array
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getBadgeTypes() {

    if (!is_null($this->_badge_types)) {
      return $this->_badge_types;
    }

    $vid = self::BADGE_VID;
    $this->_badge_types = $this->entity_type_manager->getStorage('taxonomy_term')->loadTree($vid);

    return $this->_badge_types;
  }

  /**
   *
   * Helper function to get last achieved badges.
   * @param $amount
   *
   * @return mixed
   */
  protected function getUserRecentBadgesIds($amount) {
    $query = $this->database->select('node__field_results', 'results');
    $query->innerJoin('node__field_badge_type', 'badge', 'results.entity_id = badge.entity_id');
    $query->innerJoin('node_field_data', 'n', 'n.nid = results.entity_id');
    $query->where('n.uid = :uid', [':uid' => $this->currentUser->id()]);

    $query->leftJoin('node__field_sub_user', 'su',
      'su.entity_id=results.field_results_target_id'
    );

    if ($sub_account_id = $this->getSubAccountId()) {
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    } else {
      $query->where('su.field_sub_user_target_id is NULL');
    }

    $query->fields('results', ['entity_id']);
    if ($amount > 0) {
      $query->range(0, $amount);
    }
    $query->orderBy('results.entity_id', 'DESC');

    return $query->execute()->fetchCol();
  }

  /**
   * @param $amount
   * @return \Drupal\Core\Entity\EntityBase[]|\Drupal\Core\Entity\EntityInterface[]
   */
  function getUserRecentsBadges($amount = NULL) {
    $ids = $this->getUserRecentBadgesIds($amount);
    return Node::loadMultiple($ids);
  }
}
