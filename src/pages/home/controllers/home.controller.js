/**
 * Home page controller.
 */
export default class homeCtrl {
  /*@ngInject*/

  /**
   * @constructor
   * @this {vm}
   * @param {$rootScope.Scope} $scope
   * @param {$location} $location
   * @param {$log} $log
   * @param {albumModel} albumModel
   * @param {artistModel} artistModel
   * @param {songModel} songModel
   * @param {filterModel} filterModel
   * @param {$rootScope} $rootScope
   */
  constructor($scope,
              $location,
              $log,
              albumModel,
              artistModel,
              songModel,
              filterModel,
              $rootScope) {
    this.$scope = $scope;
    this.$log = $log;
    this.artistModel = artistModel;
    this.albumModel = albumModel;
    this.songModel = songModel;
    this.$location = $location;
    this.filterModel = filterModel;

    // Defaults to songs to avoid extra validations
    this.$location.search('tab', 'songs');

    this._getCurrentTab();
    filterModel.applyCurrentFilters(this);

    // Update song album and artist list on removed from library
    $rootScope.$on('deletedFromLibrary', (event, data) => {
      filterModel.applyCurrentFilters(this);
    });

    // Update song album and artist list on added to library
    $rootScope.$on('addedToLibrary', (event, data) => {
      filterModel.applyCurrentFilters(this);
    });
  }

  /**
   * Sets the selected tab on the search params.
   * @param {string} tab
   */
  selectTab(tab) {
    this.$location.search('tab', tab);
  }

  /**
   * Called when a filter is applied to the songs.
   * @param {SongInfoEntity[]} songs
   */
  songsFiltered(songs) {
    this.songModel.songs = songs;
    this.$scope.$evalAsync();
  }

  /**
   * Called when a filter is applied to the albums.
   * @param {AlbumInfoEntity[]} albums
   */
  albumsFiltered(albums) {
    this.albumModel.albums = albums;
    this.$scope.$evalAsync();
  }

  /**
   * Called when a filter is applied to the artists.
   * @param {ArtistInfoEntity[]} artists
   */
  artistsFiltered(artists) {
    this.artistModel.artists = artists;
    this.$scope.$evalAsync();
    this.isProcessing = false;
  }

  /**
   * Based on the current tab, makes call to the model to get a new page.
   */
  loadNextPage() {
    switch(this.$location.search().tab) {
      case 'songs': this._loadSongsPage(); break;
      case 'albums': this._loadAlbumsPage(); break;
      case 'artists': this._loadArtistsPage(); break;
    }
  }

  /**
   * Asks the songs's model if there's an available page to retrieve,
   * if yes, makes the call.
   * @private
   */
  _loadSongsPage() {
    if(this.songModel.hasNextPage) {
      this.songModel.getSongsByPage();
    }
  }

  /**
   * Asks the album's model if there's an available page to retrieve,
   * if yes, makes the call.
   * @private
   */
  _loadAlbumsPage() {
    if(this.albumModel.hasNextPage) {
      this.albumModel.getAlbumsByPage();
    }
  }

  /**
   * Asks the artist's model if there's an available page to retrieve,
   * if yes, makes the call.
   * @private
   */
  _loadArtistsPage() {
    if(this.artistModel.hasNextPage) {
      this.artistModel.getArtistsByPage();
    }
  }

  /**
   * Gets the current active tab from $location search.
   * @private
   */
  _getCurrentTab() {
    const tabs = ['songs', 'albums', 'artists'];
    const tabLabel = this.$location.search().tab;
    const index = tabs.indexOf(tabLabel);
    this.selectedTab = index > 0 ? index : 0;
  }
}
