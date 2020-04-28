<?php

namespace Drupal\twelve_user\Form;

use Drupal\Core\Render\Element;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Url;
use Drupal\user\Form\UserLoginForm as DrupalUserLoginForm;
use Drupal\Core\Form\FormStateInterface;


/**
 * Class UserLoginForm
 *
 * @package Drupal\twelve_user\Form
 */
class UserLoginForm extends DrupalUserLoginForm {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // Add information about return_to page.
    $request = $this->getRequest();
    $baseUrl = $request->getSchemeAndHttpHost();
    $referer = $request->server->get('HTTP_REFERER');
    $referer_uri = str_replace($baseUrl, '', $referer);

    $config = $this->config('system.site');
    // Display login form:
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Username'),
      '#size' => 60,
      '#maxlength' => USERNAME_MAX_LENGTH,
      '#description' => $this->t('Enter your @s username.', ['@s' => $config->get('name')]),
      '#required' => TRUE,
      '#attributes' => [
        'autocorrect' => 'none',
        'autocapitalize' => 'none',
        'spellcheck' => 'false',
        'autofocus' => 'autofocus',
      ],
    ];

    $form['pass'] = [
      '#type' => 'password',
      '#title' => $this->t('Password'),
      '#size' => 60,
      '#description' => $this->t('Enter the password that accompanies your username.'),
      '#required' => TRUE,
    ];


    $form['actions'] = ['#type' => 'actions'];
    $form['actions']['submit'] = ['#type' => 'submit', '#value' => $this->t('Log in')];

    $form['separator_second'] = [
      '#markup' => '<div class="separator_second"></div>',
    ];

    $form['recover'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['user-recover'],
      ],
      'message' => [
        '#markup' => t("Forgot your password? "),
      ],
      'link' => [
        '#type' => 'link',
        '#title' => $this->t('Reset password'),
        '#url' => Url::fromRoute('user.pass'),
      ],
      '#access' => TRUE,
    ];

    $form['register'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['user-register'],
      ],
      'message' => [
        '#markup' => t("Don't have an account? "),
      ],
      'link' => [
        '#type' => 'link',
        '#title' => $this->t('Register'),
        '#url' => Url::fromRoute('user.register'),
      ],
      '#access' => TRUE,
    ];

    $form['#validate'][] = '::validateName';
    $form['#validate'][] = '::validateAuthentication';
    $form['#validate'][] = '::validateFinal';

    if (!empty($referer_uri) && (strpos($referer, $baseUrl) !== FALSE)) {
      $form['dck_referer'] = [
        '#type' => 'hidden',
        '#value' => $referer_uri,
      ];
    }

    // Use previous class in order not to break styling.
    $form['#attributes']['class'][] = 'user-login-form';

    $elements = Element::getVisibleChildren($form);
    foreach ($elements as $num => $name) {
      $form[$name]['#weight'] = $num;
    }

    // Since we are adding referer info to the form we have to disable cache.
    $form['#cache'] = ['max-age' => 0];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $account = $this->userStorage->load($form_state->get('uid'));

    // A destination was set, probably on an exception controller,
    if (!$this->getRequest()->request->has('destination')) {
      $form_state->setRedirect(
        'entity.user.canonical',
        ['user' => $account->id()]
      );
    }
    else {
      $this->getRequest()->query->set('destination', $this->getRequest()->request->get('destination'));
    }

    user_login_finalize($account);
  }

}
