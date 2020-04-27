<?php

namespace Drupal\twelve_user\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\user\Entity\User;
use Drupal\user\ProfileForm;

/**
 * Class UserRegisterForm
 *
 * @package Drupal\twelve_user\Form
 */
class UserRegisterForm extends ProfileForm {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'twelve_user_public_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    $form['#attributes']['class'][] = 'user-register-form';

    $form['actions']['submit']['#value'] = $this->t('Register Me');

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

    parent::validateForm($form, $form_state);

  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $account = $this->entity;

    $account->save();
    $form_state->setValue('uid', $account->id());
    $user = User::load($account->id());
    $user->addRole('api');
    $user->save();
    user_login_finalize($user);
  }

}
