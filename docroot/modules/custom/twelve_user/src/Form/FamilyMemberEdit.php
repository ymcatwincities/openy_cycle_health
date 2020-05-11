<?php

namespace Drupal\twelve_user\Form;

use Drupal\Core\Ajax\ReplaceCommand;
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
 * Class EditFamilyMembers.
 *
 * @package Drupal\ifw_project\Form
 */
class FamilyMemberEdit extends FormBase {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'twelve_user_family_member_edit';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $node = NULL) {

    $i=1;
    $form['title'] = [
      '#type' => 'textfield',
      '#title' => 'Title',
      '#required' => TRUE,
      '#default_value' => $node->getTitle(),
      '#prefix' => '<span class="family-member-add-form-messages"></span>',
      '#suffix' => '<div class="form-item--error-message"></div>',
    ];

    $form['submit'] = [
      '#type' => 'button',
      '#value' => 'Edit',
      '#attributes' => [
        'class' => ['btn', 'btn-primary'],
      ],
      '#ajax' => [
        'callback' => [get_class($this), 'editSubmit'],
      ],
    ];

    $form['nid'] = [
      '#type' => 'hidden',
      '#value' => $node->id(),
    ];

    $form['#attached']['library'][] = 'classy/messages';


    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function editSubmit(array &$form, FormStateInterface $form_state) {

    $response = new AjaxResponse();

    // Validation.
    $nid = $form_state->getValue('nid');
    $node = Node::load($nid);

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

      $node->set('title', $form_state->getValue('title'));
      $node->save();


      $user = User::load(\Drupal::currentUser()->id());
      $field_values = $user->get('field_family')->getValue();
      $family_ids = [];
      foreach ($field_values as $field_value) {
        $family_ids[] = $field_value['target_id'];
      }

      $family = Node::loadMultiple($family_ids);

    }


    // New content build.
    $build['items'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'family-members',
      ],
    ];

    // Building list of paragraphs including newly created.
    foreach ($family as $family_member) {
      $family_member_id = $family_member->id();

      $build['items'][$family_member_id] = [
        '#type' => 'container',
        '#attributes' => [
          'id' => 'project-update-' . $family_member_id,
        ],
      ];

      $build['items'][$family_member_id]['title'] = [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#value' => $family_member->getTitle(),
        '#attributes' => [
          'class' => 'update-title',
          'id' => 'update-title-' . $family_member_id,
        ],
      ];

      $build['items'][$family_member_id]['edit'] = [
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
          'node' => $family_member_id
        ]),
        '#title' => 'Edit',
      ];

    }

    // Replacing container containing all items with updated list.
    $response->addCommand(
      new ReplaceCommand(
        '#my-family',
        \Drupal::service('renderer')->render($build)
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
