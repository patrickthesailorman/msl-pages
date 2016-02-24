/**
 * Song model.
 * @param {$log} $log
 * @param {songStore} songStore
 * @param {$rootScope} $rootScope
 * @returns {getSong: getSong, getSongs: getSongs, song: null, songs: null}}
 */
export default function songModel($log, songStore, $rootScope) {
  let _model = {
    getSong: getSong,
    getSongs: getSongs,
    filterSongs: filterSongs,
    getSongsByPage: getSongsByPage,
    song: null,
    songs: null,
    isProcessing: false,
    isFetchingNewPage: false,
    hasNextPage: false,
    nextPage: null,
  };
  return _model;

  /**
   * Retrieves information of a single song.
   * @param {int} songId
   * @param {function} opt_done
   */
  async function getSong(songId, opt_done) {
    _model.isProcessing = true;
    try {
      const song = await songStore.fetch(songId);
      if(opt_done) {
        opt_done(song);
      }
    }
    catch(err) {
      $log.warn(err);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets all songs.
   */
  async function getSongs() {
    _model.isProcessing = true;
    try {
      const songList = await songStore.fetchAll();
      _model.songs = songList.songs;
      $rootScope.$new().$evalAsync();
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets songs by page.
   */
  async function getSongsByPage() {
    _model.isFetchingNewPage = true;
    try {
      const songList = await songStore.fetchByPage(_model.nextPage);
      _model.songs = _model.songs.concat(songList.songs);
      _model.hasNextPage = angular.isDefined(songList.pagingState);
      _setNextPage(_model.hasNextPage, songList.pagingState);
      $rootScope.$new().$evalAsync();
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isFetchingNewPage = false;
  }

  /**
   * Gets songs filtered by rating and genre.
   * @param {string} facets
   * @param {function} opt_done
   */
  async function filterSongs(facets, opt_done) {
    _model.isProcessing = true;
    try {
      const songsList = await songStore.fetchAll(facets);
      _model.hasNextPage = angular.isDefined(songsList.pagingState);
      _setNextPage(_model.hasNextPage, songsList.pagingState);
      if(opt_done) {
        opt_done(songsList.songs);
      }
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isProcessing = false;
  }

  /**
   * Sets the UUID of the next page.
   * @param {boolean} hasNextPage
   * @param {function} page
   */
  function _setNextPage(hasNextPage, page) {
    if(hasNextPage) {
      _model.nextPage = page.pagingState;
    }
  }

}
