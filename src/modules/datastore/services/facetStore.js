import {CATALOG_EDGE} from '../../../constants.js';

/**
 * @name facetStore
 * @param {request} request
 * @param {entityMapper} entityMapper
 * @param {FacetListEntity} FacetListEntity
 * @returns {*}
 */
export default function facetStore(request, entityMapper, FacetListEntity) {
  'ngInject';

  const API_REQUEST_PATH = `${CATALOG_EDGE}facet/`;

  return {
    /**
     * Fetch facets from catalogedge's facet endpoint.
     * @param {string} opt_facetId
     */
    async fetch(opt_facetId = '~') {
      const response = await request.get(`${ API_REQUEST_PATH }${ opt_facetId }`);
      return entityMapper(response.data, FacetListEntity);
    },
  };
}
