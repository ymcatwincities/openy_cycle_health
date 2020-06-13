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
    $badges = $this->family->getBadgeTypes();
    $badge_list = [];
    foreach ($badges as $badge) {
      $badge_list[$badge->name] = $badge->tid;
    }

    return [
      '#theme' => 'seven_summits',
      '#debug' => $this->isUserAdmin(),
      '#cache' => [
        'max-age' => 0,
      ],
      '#hero_config' => $this->family->get7SummitsHeroConfig(),
      '#summits' => $this->getSummits(),
      '#attached' => [
        'drupalSettings' => [
          'username' => $this->family->getActivePlayerName(),
          'sub_account_id' => $this->family->getSubAccountId(),
          'badges' => $badge_list,
        ],
      ],
    ];
  }

  /**
   * Returns seven summits information
   * @return array
   */
  function getSummits() {
    $games = $this->configFactory
      ->get($this->getGameConfigurationName())
      ->get('items');

    $imageStyleStorage = \Drupal::service('entity_type.manager')->getStorage('image_style');
    $style = $imageStyleStorage->load('mountain');

    $summits = [];
    foreach ($games as $game) {
      $paragraph = $this->findGameExercisesParagraph($game['node_id']);

      $finished_exercises = [];
      if ($user_progress_node = $this->getUserProgressNode($game['node_id'])) {
        $finished_exercises = $this->getFinishedExercisesNids($user_progress_node);
      }


      $main_image_url = '';
      if ($mediaImage = $paragraph->field_main_image->entity) {
        $main_image_url = $style->buildUrl($mediaImage->field_media_image->entity->uri->value);
      }

      $summit = [
        'game_id' => $game['node_id'],
        'progress_nid' => !is_null($user_progress_node) ? $user_progress_node->id() : 0,
        'exercises' => $this->prepareExercisesArray($paragraph),
        'finished_exercises' => $finished_exercises,
        'mountain' => $paragraph->field_mountain->value,
        'continent' => $paragraph->field_continent->value,
        'country' => $paragraph->field_country->value,
        'range' => $paragraph->field_range->value,
        'elevation' => $paragraph->field_elevation->value,
        'description' => $paragraph->field_prgf_description->value,
        'geolocation' => $paragraph->field_geolocation->value,
        'main_image' => $main_image_url,
        'images'
      ];

      $summits[] = $summit;
    }

    return $summits;
  }

  /**
   * @inheritDoc
   */
  function prepareExercisesArray($game_paragraph = NULL) {
    $exercises_array = [];
    if (empty($game_paragraph)) {
      return $exercises_array;
    }

    $index_number = 1;
    foreach ($game_paragraph->field_excercises as $exercise_reference) {
      /** @var \Drupal\Core\Field\Plugin\Field\FieldType\EntityReferenceItem $exercise_reference */
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
}
