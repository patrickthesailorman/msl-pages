/**
 * @param {$http} $http
 * @returns {*}
 */
export default function request ($http) {
  'ngInject';

  return {
    /**
     * @name request#get
     * @param {string} path
     * @param {Object} opt_config
     * @return {*}
     */
    async get(path, opt_config = {}) {
      opt_config.withCredentials = false;
      const response = await $http.get(path, opt_config);
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
      opt_config.withCredentials = false;
      const response = await $http.post(path, content, opt_config);
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
      opt_config.withCredentials = false;
      const response = await $http.put(path, content, opt_config);
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
      opt_config.withCredentials = false;
      const response = await $http.delete(path, content, opt_config);
      return response.data;
    },
  };
}
