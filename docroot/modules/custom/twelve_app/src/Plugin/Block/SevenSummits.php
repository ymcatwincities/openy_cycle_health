<?php

namespace Drupal\twelve_app\Plugin\Block;

use Drupal\Core\Cache\Cache;

/**
 * Provides a 'Bingo app' block.
 *
 * @Block(
 *   id = "seven_summits_app",
 *   admin_label = @Translation("Seven Summits game app"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class SevenSummits extends GameAbstract {

  /**
   * {@inheritdoc}
   */
  public function getGameConfigurationName() {
    return 'twelve_app.seven_summits_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function getGameParagraphBundle() {
    return '7_summits_app';
  }

  /**
   * {@inheritdoc}
   */
  public function getGameExercisesParagraphBundle() {
    return 'mountain_schedule';
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array_merge(parent::build(), [
      '#theme' => 'seven_summits',
    ]);
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

    $index_number = 1;
    foreach ($paragraph->field_excercises as $exercise_reference) {
      /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $puzzle_part_reference */
      $exercise_entity = $exercise_reference->entity;
      $exercises_array[] = [
        'label' => $exercise_entity->title->value,
        'description' => $exercise_entity->body->value,
        'timer' => $exercise_entity->field_timer->value,
        'gif_path' => $exercise_entity->field_animation->value,
        'id' => $exercise_entity->id(),
        'index_number' => $index_number++
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
