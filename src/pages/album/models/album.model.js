/**
 * Album Model.
 * @param {albumStore} albumStore
 * @param {songStore} songStore
 * @param {$log} $log
 * @param {$rootScope} $rootScope
 * @returns {getAlbum: getAlbum, getAlbums: getAlbums, album: null, albums: null}}
 */
export default function albumModel(albumStore, songStore, $log, $rootScope) {

  let _model = {
    getAlbum: getAlbum,
    getAlbums: getAlbums,
    filterAlbums: filterAlbums,
    getAlbumSongs: getAlbumSongs,
    getAlbumsByPage: getAlbumsByPage,
    album: null,
    albums: null,
    isProcessing: false,
    isFetchingNewPage: false,
    hasNextPage: false,
    nextPage: null,
  };
  return _model;

  /**
   * Gets a specific album.
   * @param {int} albumId
   */
  async function getAlbum(albumId) {
    _model.isProcessing = true;
    try {
      _model.album = await albumStore.fetch(albumId);
      $rootScope.$new().$evalAsync();
    } catch(err) {
      $log.warn(err);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets a list of songs.
   * @param {string} albumId
   * @param {function} opt_done
   */
  async function getAlbumSongs(albumId, opt_done) {
    _model.isProcessing = true;
    try {
      const album = await albumStore.fetch(albumId);
      await getSongsById(album.songsList);
      if(opt_done) {
        opt_done(_model.songs);
      }
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets a list of songs.
   * @param {string[]} songIds
   */
  async function getSongsById(songIds) {
    _model.isProcessing = true;
    try {
      const songs = songIds.map(async (songId) => await songStore.fetch(songId));
      _model.songs = await Promise.all(songs);
      $rootScope.$new().$evalAsync();
    } catch(err) {
      _model.songs = [];
      $log.warn(err);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets all albums.
   */
  async function getAlbums() {
    _model.isProcessing = true;
    try {
      const albumList = await albumStore.fetchAll();
      _model.albums = albumList.albums;
      $rootScope.$new().$evalAsync();
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isProcessing = false;
  }

  /**
   * Gets albums by page.
   */
  async function getAlbumsByPage() {
    _model.isFetchingNewPage = true;
    try {
      const albumList = await albumStore.fetchByPage(_model.nextPage);
      _model.albums = _model.albums.concat(albumList.albums);
      _model.hasNextPage = angular.isDefined(albumList.pagingState);
      _setNextPage(_model.hasNextPage, albumList.pagingState);
      $rootScope.$new().$evalAsync();
    }
    catch(error) {
      $log.warn(error);
    }
    _model.isFetchingNewPage = false;
  }

  /**
   * Gets a list of albums filtered by rating and genre.
   * @param {string} facets
   * @param {function} opt_done
   */
  async function filterAlbums(facets, opt_done) {
    _model.isProcessing = true;
    try {
      const albumList = await albumStore.fetchAll(facets);
      _model.hasNextPage = angular.isDefined(albumList.pagingState);
      _setNextPage(_model.hasNextPage, albumList.pagingState);
      if(opt_done) {
        opt_done(albumList.albums);
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
