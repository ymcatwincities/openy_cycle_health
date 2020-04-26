<?php

namespace Drupal\twelve_app\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\node\Entity\Node;

/**
 * Settings Form for Puzzle app.
 */
class PuzzleSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'twelve_app_puzzle_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'twelve_app.puzzle_settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $config = $this->config('twelve_app.puzzle_settings');

    if (empty($form_state->get('items'))) {
      $items = $config->get('items');
      $form_state->set('items', $items);
    } else {
      $items = $form_state->get('items');
    }

    $form['#tree'] = TRUE;
    $form_state->setCached(FALSE);

    $form['actions'] = [
      '#type' => 'actions',
    ];

    $form['nodes_container'] = array(
      '#type' => 'fieldset',
      '#title' => $this->t('Items'),
      '#prefix' => '<div id="items-wrapper">',
      '#suffix' => '</div>',
    );

    $i = 0;
    foreach ($items as $item) {

      $node = NULL;

      $form['nodes_container'][$i] = [
        '#type' => 'fieldset',
        '#title' => 'Schedule Item',
      ];

      if (!empty($item['node_id'])) {
        $node = Node::load($item['node_id']);
      }

      $date = $item['date'];
      $form['nodes_container'][$i]['date'] = [
        '#type' => 'date',
        '#title' => 'Date',
        '#default_value' => $date,
      ];

      $form['nodes_container'][$i]['node_id'] = [
        '#type' => 'entity_autocomplete',
        '#target_type' => 'node',
        '#title' => t('Today exercises list page'),
        '#default_value' => $node,
        '#size' => 40,
        '#selection_settings' => [
          'target_bundles' => ['landing_page'],
        ],
        '#description' => t('Search by title'),
      ];

      $i++;

    }

    $form['add_item']= [
      '#type' => 'submit',
      '#value' => 'Add item',
      '#submit' => [[$this, 'add_item_submit']],
      '#ajax' => [
        'callback' => [$this, 'add_item_callback'],
        'wrapper' => 'items-wrapper',
      ],
    ];

    $form['delete_first'] = [
      '#type' => 'submit',
      '#value' => 'Delete item',
      '#submit' => [[$this, 'delete_item_submit']],
      '#ajax' => [
        'callback' => [$this, 'add_item_callback'],
        'wrapper' => 'items-wrapper',
      ],
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * @param $form
   * @param $form_state
   */
  public function delete_item_submit(&$form, FormStateInterface $form_state) {
    $items = $form_state->get('items');
    if (empty($items[0])) {
      $items = NULL;
    } else {
      $items = array_shift($items);
      if (empty($items[0])) {
        $items = [
          [
            'date' => date('Y-m-d'),
            'node' => '',
          ]
        ];
      }
    }

    if (empty($items[0])) {
      $items = [$items];
    }

    $form_state->set('items', array_values($items));
    $form_state->setRebuild(TRUE);
  }

  /**
   * @param $form
   * @param $form_state
   */
  public function add_item_submit(&$form, FormStateInterface $form_state) {
    $items = $form_state->get('items');
    $items[] = [
      'date' => '',
      'node_id' => NULL,
    ];
    $form_state->set('items', $items);
    $form_state->setRebuild(TRUE);
  }

  /**
   * @param $form
   * @param $form_state
   *
   * @return mixed
   */
  public function add_item_callback(&$form, FormStateInterface $form_state) {
    return $form['nodes_container'];
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    /* @var $config \Drupal\Core\Config\Config */
    $config = $this->configFactory->getEditable('twelve_app.puzzle_settings');
    $config->set('items', $form_state->getValue('nodes_container'))->save();
    parent::submitForm($form, $form_state);
  }
}
