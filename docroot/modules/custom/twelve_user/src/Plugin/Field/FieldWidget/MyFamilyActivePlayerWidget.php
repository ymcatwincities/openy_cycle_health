<?php

namespace Drupal\twelve_user\Plugin\Field\FieldWidget;

use Drupal\Core\Ajax\AfterCommand;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\RemoveCommand;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\OptionsSelectWidget;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 *  Twelve family listing field widget.
 *
 * @FieldWidget(
 *   id = "twelve_family_active_member",
 *   label = @Translation("Twelve: Set Active Member"),
 *   description = @Translation("Widget to to set Active Member"),
 *   field_types = {
 *     "entity_reference"
 *   }
 * )
 */
class MyFamilyActivePlayerWidget extends OptionsSelectWidget {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state); // TODO: Change the autogenerated stu$i=1;

    $element['#options']['_none'] = $this->t('Me');

    $element['#ajax'] = [
      'callback' => [get_class($this), 'setActiveMember'],
    ];

    return $element;
  }

  /**
   * Helper method for ajax update of active family member.
   *
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public static function setActiveMember(array &$form, FormStateInterface $form_state) {
    $selected_item = $form_state->getValue('field_active_family_member');
    /** @var \Drupal\user\Entity\User $user */
    $user = $form_state->getStorage()['user'];

    $user->set('field_active_family_member', $selected_item[0]);
    $user->save();

    $response = new AjaxResponse();

    $selector = '.active-message';
    $response->addCommand(new RemoveCommand($selector));

    $selector = '#edit-field-active-family-member-0';
    $content = '<div class="active-message"> Active player updated.</div>';

    $response->addCommand(new AfterCommand($selector, $content));

    $active_player_name = \Drupal::service('twelve_user.family')->getActivePlayerName();
    $response->addCommand(new HtmlCommand(
      '.greeting',
      t('Hello, @name', ['@name' => $active_player_name])
    ));

    return $response;

  }

  /**
   * {@inheritdoc}
   */
  public function form(FieldItemListInterface $items, array &$form, FormStateInterface $form_state, $get_delta = NULL) {
    $element = parent::form($items, $form, $form_state, $get_delta);

    $i=1;

    return $element;
  }

}
