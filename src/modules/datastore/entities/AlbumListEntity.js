import AlbumInfoEntity from './AlbumInfoEntity';
/**
 * @name AlbumListEntity
 * @property {AlbumInfoEntity[]} albums
 */
export default class AlbumListEntity {
  constructor() {
    this.pagingState = Object;
    this.albums = [AlbumInfoEntity];
  }
}
