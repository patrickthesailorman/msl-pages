/**
 * Player directive controller.
 * @param {$rootScope.Scope} $scope
 * @param {player} player
 */
function playerController ($scope, player) {
  'ngInject';

  /**
   * Listener for player state change
   * this is not angular action so we need to digest scope manually.
   */
  let onPlayerStateChange = () => {
    this.active = player.isActive();
    this.songEntity = player.getSongEntity();
    $scope.$evalAsync();
  };

  /**
   * Close player user action.
   */
  this.close = () => player.stop();

  // Add player state change listener
  player.addStateChangeListener(onPlayerStateChange);
  // When scope destroys then remove player state change listener
  $scope.$on('$destroy', () => player.removeStateChangeListener(onPlayerStateChange));
}

export default function playerDirective () {
  'ngInject';

  return {
    restrict: 'E',
    template: require('../templates/player.html'),
    controller: playerController,
    controllerAs: 'player',
  };
}
