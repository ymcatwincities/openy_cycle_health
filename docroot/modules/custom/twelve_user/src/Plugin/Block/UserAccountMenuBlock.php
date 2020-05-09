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
      '#type' => 'container',
      '#attributes' => [
        'class' => ['user-account-menu'],
      ],
      [
        '#type' => 'html_tag',
        '#tag' => 'input',
        '#attributes' => [
          'type' => 'checkbox',
          'id' => 'mobile'
        ]
      ],
      [
        '#type' => 'html_tag',
        '#tag' => 'label',
        '#value' => '',
        '#attributes' => [
          'for' => 'mobile',
          'class' => 'fa fa-th'
        ]
      ],
      [
        '#type' => 'container',
        [
          '#title' => $this->t('Switch User'),
          '#type' => 'link',
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-random'
          ]
        ],
        [
          '#title' => $this->t('Dashboard'),
          '#type' => 'link',
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-chart-line'
          ]
        ],
        [
          '#title' => $this->t('My Family'),
          '#type' => 'link',
          '#url' => Url::fromRoute('twelve_user.family_edit_form', ['user'=> $this->currentUser->id()]),
          '#attributes' => [
            'class' => 'fas fa-user-friends'
          ]
        ],
        [
          '#title' => $this->t('Settings'),
          '#type' => 'link',
          '#url' => Url::fromUserInput('#'),
          '#attributes' => [
            'class' => 'fas fa-cog'
          ]
        ],
        [
          '#title' => $this->t('Log Out'),
          '#type' => 'link',
          '#url' => Url::fromRoute('user.logout'),
          '#attributes' => [
            'class' => 'sign-out'
          ]
        ],
      ],
    ];
  }

}
