<?php

namespace Drupal\twelve_user\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\Url;

/**
 *  Twelve family listing field widget.
 *
 * @FieldWidget(
 *   id = "twelve_family_list",
 *   label = @Translation("Twelve: Family list"),
 *   description = @Translation("Widget to manage user family"),
 *   field_types = {
 *     "entity_reference"
 *   }
 * )
 */
class MyFamilyFieldWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {

    $list = $items->getValue();

    $build = [];

    if (!empty($list[$delta]['target_id'])) {

      $nid = $list[$delta]['target_id'];
      $node = Node::load($nid);
      if (!$node) {
        return $build;
      }

      $build['row']['title'] = [
        '#type' => 'html_tag',
        '#tag' => 'div',
        '#value' => $node->getTitle(),
        '#attributes' => [
          'class' => 'update-title',
          'id' => 'family-member-title-' . $nid,
        ],
      ];

      $build['row']['edit'] = [
        '#type' => 'link',
        '#attributes' => [
          'class' => ['use-ajax edit-button'],
          'data-dialog-type' => 'modal',
          'data-dialog-options' => json_encode([
            'dialogClass' => 'edit-family-member',
            'width' => 'auto',
            'height' => 'auto',
          ]),
        ],
        '#url' => Url::fromRoute('twelve_user.family_member_edit', [
          'node' => $nid,
        ]),
        '#title' => $this->t('Edit'),
      ];

    }

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function form(FieldItemListInterface $items, array &$form, FormStateInterface $form_state, $get_delta = NULL) {
    $element = parent::form($items, $form, $form_state, $get_delta);

    // Disabling widget theme
    unset($element['widget']['#theme']);

    $element['widget']['items'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'my-family',
      ],
    ];

    // Moving all items to container and removing weight field (tabledrag)
    foreach ($element['widget'] as $idx => &$widget) {
      if (is_numeric($idx)) {
        unset($widget['_weight']);
        $widget['#type'] = 'container';
        $element['widget']['items'][$idx] = $widget;
        unset($element['widget'][$idx]);
      }
    }

    $element['widget']['add_more'] = [
      '#type' => 'link',
      '#weight' => -100,
      '#attributes' => [
        'class' => ['use-ajax', 'button--secondary--inverse'],
        'data-dialog-type' => 'modal',
        'data-dialog-options' => json_encode([
          'dialogClass' => 'add-update-form',
          'width' => 380,
          'height' => 350,
        ]),
      ],
      '#url' => Url::fromRoute('twelve_user.family_member_add'),
      '#title' => $this->t('Add'),
    ];
    $element['widget']['#prefix'] = '<div id="field-family-add-more-wrapper">';
    $element['widget']['#suffix'] = '</div>';

    $element['#attached']['library'][] = 'core/drupal.dialog.ajax';

    return $element;
  }

}
