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
    song: null,
    songs: null,
    isProcessing: false,
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
   * Gets songs filtered by rating and genre.
   * @param {string} facets
   * @param {function} opt_done
   */
  async function filterSongs(facets, opt_done) {
    _model.isProcessing = true;
    try {
      const songsList = await songStore.fetchAll(facets);
      if(opt_done) {
        opt_done(songsList.songs);
      }
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isProcessing = false;
  }

}
