/**
 * Play button directive controller.
 * @param {$rootScope.Scope} $scope
 * @param {player} player
 */
function playButtonController ($scope, player) {
  'ngInject';

  this.currentlyPlayingSong = false;

  /**
   * Listener for player state change.
   * This is not angular action so we need to digest scope manually.
   */
  let onPlayerStateChange = () => {
    const songEntity = player.getSongEntity();
    if(songEntity) {
      this.currentlyPlayingSong = songEntity.songId === $scope.songId;
    }
    else {
      this.currentlyPlayingSong = false;
    }
    $scope.$evalAsync();
  };

  /**
   * Play button user action.
   */
  this.play = function () {
    if(this.currentlyPlayingSong) {
      player.stop();
    }
    else {
      player.play($scope.songId);
    }
  };

  // Add player state change listener.
  player.addStateChangeListener(onPlayerStateChange);
  // When scope destroys then remove player state change listener
  $scope.$on('$destroy', () => player.removeStateChangeListener(onPlayerStateChange));
}

export default function playButton () {

  'ngInject';

  return {
    restrict: 'E',
    controller: playButtonController,
    controllerAs: 'pb',
    template: require('../templates/playButton.html'),
    scope: {
      songId: '=',
    },
  };
}
