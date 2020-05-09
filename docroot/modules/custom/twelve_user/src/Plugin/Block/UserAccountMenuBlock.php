<?php

namespace Drupal\twelve_user\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Block(
 *   id = "user_account_menu_block",
 *   admin_label = @Translation("User Account Menu"),
 * )
 */
class UserAccountMenuBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Current user service instance.
   *
   * @var AccountProxyInterface
   */
  protected $currentUser;

  /**
   * Creates a LocalTasksBlock instance.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Menu\LocalTaskManagerInterface $local_task_manager
   *   The local task manager.
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route match.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition,
                              AccountProxyInterface $current_user) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->currentUser = $current_user;

  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#type' => 'container', '#attributes' => [
        'class' => ['user-account-menu'],
      ],
      [
        '#type' => 'html_tag', '#tag' => 'input', '#attributes' => [
          'type' => 'checkbox',
          'id' => 'mobile'
        ]
      ],
      [
        '#type' => 'html_tag', '#tag' => 'label', '#attributes' => [
          'for' => 'mobile',
          'class' => 'fa fa-th'
        ]
      ],
      [
        '#type' => 'container',
        [
          '#type' => 'link', '#title' => $this->t('Switch User'),
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-random'
          ]
        ],
        [
          '#type' => 'link', '#title' => $this->t('Dashboard'),
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-chart-line'
          ]
        ],
        [
          '#type' => 'link', '#title' => $this->t('My Family'),
          '#url' => Url::fromRoute('twelve_user.family_edit_form', ['user'=> $this->currentUser->id()]),
          '#attributes' => [
            'class' => 'fas fa-user-friends'
          ]
        ],
        [
          '#type' => 'link', '#title' => $this->t('Settings'),
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-cog'
          ]
        ],
        [
          '#type' => 'link', '#title' => $this->t('Log Out'),
          '#url' => Url::fromRoute('user.logout'),
          '#attributes' => [
            'class' => 'sign-out'
          ]
        ],
      ],
    ];
  }

}
