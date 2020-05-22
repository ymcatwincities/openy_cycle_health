<?php
namespace Drupal\twelve_user;

use Drupal\Core\Database\Connection;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\user\Entity\User;

/**
 * Service Class Family
 *
 * @package Drupal\twelve_user
 */
class Family {

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

  /**
   * @var int
   */
  protected $_subAccountId = null;

  /**
   * Family constructor.
   *
   * @param \Drupal\Core\Session\AccountProxyInterface $current_user
   * @param \Drupal\Core\Database\Connection $database
   */
  public function __construct(AccountProxyInterface $current_user, Connection $database) {
    $this->currentUser = $current_user;
    $this->database = $database;
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
    $query->leftJoin('node', NULL, 'fin_items.entity_id = node.nid');
    $query->leftJoin('node_revision', NULL, 'node.vid = node_revision.vid');
    $query->where('node_revision.revision_uid = :uid', [':uid' => $this->currentUser->id()]);

    if ($sub_account_id = $this->getSubAccountId()) {
      $query->leftJoin('node__field_sub_user', 'su', 'su.entity_id=fin_items.entity_id');
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    }

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
   * Returns hiddgen image badge count
   * @return int
   */
  public function hiddenImageBadgeCount() {
    $query = $this->database->select('node__field_results', 't1');
    $query->leftJoin('node__field_badge_type', 't2', 't1.entity_id = t2.entity_id');
    $query->leftJoin('node', 'n', 'n.nid=t1.entity_id');
    $query->leftJoin('node_revision', 'nr', 'n.vid = nr.vid');
    $query->leftJoin('taxonomy_term_field_data', 'term', 'term.tid = t2.field_badge_type_target_id');
    $query->where('nr.revision_uid = :uid', [':uid' => $this->currentUser->id()]);
    $query->where('term.name = :term', [':term' => 'Hidden Picture']);

    if ($sub_account_id = $this->getSubAccountId()) {
      $query->leftJoin('node__field_sub_user', 'su',
        'su.entity_id=t1.entity_id'
      );
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    }

    return $query->countQuery()->execute()->fetchField();
  }

  /**
   * Returns bingo badge count
   * @return int
   */
  public function bingoBadgeCount() {
    $query = $this->database->select('node__field_results', 't1');
    $query->leftJoin('node__field_badge_type', 't2', 't1.entity_id = t2.entity_id');
    $query->leftJoin('node', 'n', 'n.nid=t1.entity_id');
    $query->leftJoin('node_revision', 'nr', 'n.vid = nr.vid');
    $query->leftJoin('taxonomy_term_field_data', 'term', 'term.tid = t2.field_badge_type_target_id');
    $query->where('nr.revision_uid = :uid', [':uid' => $this->currentUser->id()]);
    $query->where('term.name = :term', [':term' => 'Bingo']);

    if ($sub_account_id = $this->getSubAccountId()) {
      $query->leftJoin('node__field_sub_user', 'su',
        'su.entity_id=t1.entity_id'
      );
      $query->where('su.field_sub_user_target_id=:suid', [':suid' => $sub_account_id]);
    }

    return $query->countQuery()->execute()->fetchField();
  }
}
