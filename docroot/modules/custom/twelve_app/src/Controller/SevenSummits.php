<?php
namespace Drupal\twelve_app\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Driver\Exception\Exception;
use Drupal\twelve_user\Family;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Controller
*/
class SevenSummits extends ControllerBase {

  /**
   * @var \Drupal\twelve_user\Family
   */
  protected $family;

  /**
   * @var \Drupal\Core\Logger\LoggerChannelInterface
   */
  protected $logger;

  /**
   * @param \Drupal\twelve_user\Family $family
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $loggerFactory
   */
  public function __construct(Family $family, LoggerChannelFactoryInterface $loggerFactory) {
    $this->family = $family;
    $this->logger = $loggerFactory->get('twelve_app');
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('twelve_user.family'),
      $container->get('logger.factory')
    );
  }

  /**
   * Render method for /seven-summits/save-hero/{jacketColor}/{fleshTone}
   *
   * @param $jacketColor
   * @param $fleshTone
   *
   * @return AjaxResponse
   */
  public function saveHero($jacketColor, $fleshTone) {
    try {
      $this->family->save7SummitsHeroConfig($jacketColor, $fleshTone);
      return new AjaxResponse([
        'status' => 'ok'
      ]);
    } catch (Exception $e) {
      $this->logger->error($e->getMessage());
      return new AjaxResponse([
        'status' => 'error'
      ], AjaxResponse::HTTP_INTERNAL_SERVER_ERROR);
    }
  }

}
