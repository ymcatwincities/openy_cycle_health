<?php

namespace Drupal\twelve_user\Form;

use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\AfterCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\Core\Ajax\RemoveCommand;
use Drupal\Core\Ajax\CloseModalDialogCommand;
use Drupal\user\Entity\User;

/**
 * Class AddFamilyMembers.
 *
 * @package Drupal\ifw_project\Form
 */
class FamilyMemberAdd extends FormBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'twelve_user_family_member_add';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $project = NULL, $update_id = 0) {

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => 'Title',
      '#required' => TRUE,
      '#prefix' => '<span class="family-member-add-form-messages"></span>',
      '#suffix' => '<div class="form-item--error-message"></div>',
    ];

    $form['submit'] = [
      '#type' => 'button',
      '#value' => 'Add Family Member',
      '#attributes' => [
        'class' => ['btn', 'btn-primary'],
      ],
      '#ajax' => [
        'callback' => [get_class($this), 'addSubmit'],
      ],
    ];

    $form['#attached']['library'][] = 'classy/messages';


    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public static function addSubmit(array &$form, FormStateInterface $form_state) {

    $response = new AjaxResponse();

    // Validation.

    if (empty($form_state->getValue('title'))) {
      $selector = '.twelve-user-family-member-add [name$="title"]';
      $method = 'addClass';
      $arguments = ['error'];
      $response->addCommand(new InvokeCommand($selector, $method, $arguments));

      $selector = '.form-item--error-message';
      $response->addCommand(new RemoveCommand($selector));

      $selector = '.form-item-title';
      $content = '<div class="form-item--error-message">
                      <strong>Title field is required.</strong>
                    </div>';
      $response->addCommand(new AfterCommand($selector, $content));

      return $response;
    } else {

      $node = Node::create([
        'title' => $form_state->getValue('title'),
        'type' => 'family_member',
        'uid' => \Drupal::currentUser()->id(),
      ]);

      $node->save();

      $user = User::load(\Drupal::currentUser()->id());

      $field_values = $user->get('field_family')->getValue();

      $new_value = [[
        'target_id' => $node->id()
      ]];

      $updated_field_values = array_merge($field_values, $new_value);

      $user->set('field_family', $updated_field_values);
      $user->save();

      $family_ids = [];
      foreach ($updated_field_values as $field_value) {
        $family_ids[] = $field_value['target_id'];
      }

      $family = Node::loadMultiple($family_ids);

    }

    // Update active user select data.
    $options = [
      '_none' => 'Me'
    ];

    // Building list of paragraphs including newly created.
    foreach ($family as $family_member) {

      $family_member_id = $family_member->id();

      $options[$family_member_id] = $family_member->getTitle();

      $build[$family_member_id] = [
        '#type' => 'container',
        '#attributes' => [
          'id' => 'family-member-' . $family_member_id,
        ],
      ];

      $build[$family_member_id]['title'] = [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#value' => $family_member->getTitle(),
        '#attributes' => [
          'class' => 'update-title',
          'id' => 'family-member-title-' . $family_member_id,
        ],
      ];

      $build[$family_member_id]['edit'] = [
        '#type' => 'link',
        '#attributes' => [
          'class' => ['use-ajax'],
          'data-dialog-type' => 'modal',
          'data-dialog-options' => json_encode([
            'dialogClass' => 'edit-update-form',
            'width' => 'auto',
            'height' => 'auto',
          ]),
        ],
        '#url' => Url::fromRoute('twelve_user.family_member_edit', [
          'node' => $family_member->id(),
        ]),
        '#title' => 'Edit',
      ];

    }

    $options_markup = '';
    foreach ($options as $id => $option) {
      $options_markup .= '<option value="' . $id . '">' . $option . '</option>';
    }

    $render = \Drupal::service('renderer')->render($build);

    $response->addCommand(
      new HtmlCommand(
        '#edit-field-active-family-member-0',
                $options_markup
      )
    );

    // Replacing container containing all items with updated list.
    $response->addCommand(
      new HtmlCommand(
        '#my-family',
        $render
      )
    );

    $response->addCommand(
      new CloseModalDialogCommand()
    );

    return $response;

  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    // TODO: Implement submitForm() method.
  }

}
