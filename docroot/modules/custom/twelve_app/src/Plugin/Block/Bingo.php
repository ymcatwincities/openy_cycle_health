<?php

namespace Drupal\twelve_app\Plugin\Block;

use Drupal\Core\Cache\Cache;

/**
 * Provides a 'Bingo app' block.
 *
 * @Block(
 *   id = "twelve_bingo",
 *   admin_label = @Translation("Bingo game app"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class Bingo extends GameAbstract {

  /**
   * {@inheritdoc}
   */
  public function getGameConfigurationName() {
    return 'twelve_app.bingo_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function getGameParagraphBundle() {
    return 'bingo_app';
  }

  /**
   * {@inheritdoc}
   */
  public function getGameExercisesParagraphBundle() {
    return 'bingo_container';
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $user = $this->currentUser->getAccount();
    if (empty($user->id())) {
      return [];
    }

    $progress_nid = 0;
    $progress_node = $this->getUserProgressNode();
    if ($progress_node !== NULL) {
      $progress_nid = $progress_node->id();
    }

    return array_merge(
      parent::build(), [
        '#theme' => 'bingo',
        '#progress_nid' => $progress_nid,
        '#finished_items' => $this->getFinishedExercisesNids(),
      ]
    );
  }

  /**
   * {@inheritdoc}
   */
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
   * {@inheritdoc}
   */
  public function getCacheTags() {
    $user_id = $this->currentUser->getAccount()->id();

    return Cache::mergeTags(parent::getCacheTags(), [
      'user_id' . $user_id,
      'finished_items' . count($this->getFinishedExercisesNids()),
    ]);
  }

}
