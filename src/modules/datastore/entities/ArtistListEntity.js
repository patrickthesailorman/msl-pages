import ArtistInfoEntity from './ArtistInfoEntity';
/**
 * @name ArtistListEntity
 * @property {ArtistInfoEntity[]} artists
 */
class ArtistListEntity {
  constructor() {
    this.pagingState = Object;
    this.artists = [ArtistInfoEntity];
  }
}

export default ArtistListEntity;
