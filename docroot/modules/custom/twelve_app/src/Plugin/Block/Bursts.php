<?php
namespace Drupal\twelve_app\Plugin\Block;

use Drupal\node\Entity\Node;

/**
 * Provides a 'Today Progress' block.
 *
 * @Block(
 *   id = "today_progress",
 *   admin_label = @Translation("Bursts app"),
 *   category = @Translation("Paragraph Blocks")
 * )
 */
class Bursts extends GameAbstract {

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
      '#theme' => 'bursts',
      '#completion_url' => $this->getCompletionUrl(),
    ];

    return array_merge(
      parent::build(), $build
    );
  }

  protected function prepareExercisesArray($game_paragraph = NULL) {
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
