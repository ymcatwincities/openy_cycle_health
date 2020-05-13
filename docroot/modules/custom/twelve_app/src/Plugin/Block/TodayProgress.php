<?php
namespace Drupal\twelve_app\Plugin\Block;

use Drupal\node\Entity\Node;

/**
 * Provides a 'Today Progress' block.
 *
 * @Block(
 *   id = "today_progress",
 *   admin_label = @Translation("12 bursts today progress"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class TodayProgress extends GameAbstract {

  /**
   * {@inheritdoc}
   */
  function getGameConfigurationName() {
    return 'twelve_app.settings';
  }

  /**
   * {@inheritdoc}
   */
  function getGameParagraphBundle() {
    return 'today_progress_app';
  }

  /**
   * {@inheritdoc}
   */
  function getGameExercisesParagraphBundle() {
    return '12_bursts_container';
  }

  /**
   * {@inheritdoc}
   */
  public function build() {

    $build = [
      '#theme' => 'today_progress',
      '#completion_url' => $this->getCompletionUrl(),
    ];

    $user = $this->currentUser->getAccount();

    // Prepare data for authenticated user.
    if (empty($user->id())) {
      $progress_nid = 0;
      $progress_node = $this->getUserProgressNode();
      if ($progress_node !== NULL) {
        $progress_nid = $progress_node->id();
        $build['#progress_nid'] = $progress_nid;
        $build['#finished_items'] = $this->getFinishedExercisesNids();
      }
    }

    return array_merge(
      parent::build(), $build
    );
  }

  protected function prepareExercisesArray() {
    $exercises_array = [];
    $paragraph = $this->findGameExercisesParagraph();
    if (empty($paragraph)) {
      return $exercises_array;
    }

    foreach ($paragraph->field_excercises as $exercise_reference) {
      /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $puzzle_part_reference */
      $exercise_entity = $exercise_reference->entity;
      $exercises_array[] = [
        'label' => $exercise_entity->title->value,
        'description' => $exercise_entity->body->value,
        'timer' => $exercise_entity->field_timer->value,
        'gif' => $exercise_entity->field_animation->value,
        'id' => $exercise_entity->id(),
      ];
    }

    return $exercises_array;
  }

  /**
   * @return \Drupal\Core\GeneratedUrl|string
   * @throws \Drupal\Core\Entity\EntityMalformedException
   */
  protected function getCompletionUrl() {
    $completion_node_url = '';
    $completion_node_id = $this->configFactory
      ->get($this->getGameConfigurationName())
      ->get('completion_node_id');
    if (!empty($completion_node_id)) {
      $completion_page = Node::load($completion_node_id);
      $completion_node_url = $completion_page->toUrl()->toString();
    }
    return $completion_node_url;
  }
}
