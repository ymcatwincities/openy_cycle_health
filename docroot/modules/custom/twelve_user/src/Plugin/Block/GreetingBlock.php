<?php

namespace Drupal\twelve_user\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\twelve_user\Family;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * @Block(
 *   id = "greeting_block",
 *   admin_label = @Translation("Greeting Menu"),
 * )
 */
class GreetingBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * @var Family
   */
  protected $family;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    Family $family
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->family = $family;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('twelve_user.family')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#type' => 'container',
      '#attributes' => [
        'class' => ['greeting'],
      ],
      [
        '#markup' => $this->t('Hello, @name', ['@name' => $this->family->getActivePlayerName()])
      ]
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts() {
    $contexts = parent::getCacheContexts();

    $contexts[] = 'user';

    return $contexts;
  }

}
