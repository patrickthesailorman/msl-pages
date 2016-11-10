/**
 * @param {$http} $http
 * @param {$location} $location
 * @returns {*}
 */
export default function request ($http, $location) {
  'ngInject';

  /**
   * Append api host to request path.
   * @param {string} path
   * @returns {string}
   */
  function withHost (path) {
    if(process.env.NODE_ENV !== 'production') {
      return [`http://${ $location.host() }`, path].join('');
    }
    else {
      return path;
    }
  }

  return {
    /**
     * @name request#get
     * @param {string} path
     * @param {Object} opt_config
     * @return {*}
     */
    async get(path, opt_config = {}) {
      const response = await $http.get(withHost(path), opt_config);
      return response.data;
    },
    /**
     * @name request#post
     * @param {string} path
     * @param {*} content
     * @param {Object} opt_config
     * @return {*}
     */
    async post(path, content, opt_config = {}) {
      const response = await $http.post(withHost(path), content, opt_config);
      return response.data;
    },
    /**
     * @name request#put
     * @param {string} path
     * @param {*} content
     * @param {Object} opt_config
     * @return {*}
     */
    async put(path, content = null, opt_config = {}) {
      const response = await $http.put(withHost(path), content, opt_config);
      return response.data;
    },
    /**
     * @name request#delete
     * @param {string} path
     * @param {*} content
     * @param {Object} opt_config
     * @return {*}
     */
    async delete(path, content = null, opt_config = {}) {
      const response = await $http.delete(withHost(path), content, opt_config);
      return response.data;
    },
  };
}
