import _ from 'lodash';

/**
 * Response raw object mapper to typed entity.
 * @name entityMapper
 * @type {Function}
 */
export default function entityMapper () {
  'ngInject';

  /**
   * @param {Object} response
   * @param {Function} Entity
   * @returns {*}
   */
  function mapper (response, Entity) {
    // Create new instance of entity
    const entity = new Entity();
    // Get entity map keys
    let keys = _.keys(entity);

    // If the entity have no keys try it as a native object
    if(_.isEmpty(keys)) {
      return new Entity(response);
    }
    else {
      // Loop per response keys
      _.forEach(_.keys(response), (key) => {
        // Camel case response map key
        const method = _.camelCase(key);
        // Check if we can create instance of key type
        if(_.isFunction(entity[method])) {
          // Create new key type instance
          const Instance = entity[method];
          // Assign it response value and get its instance
          entity[method] = new Instance(response[key]).valueOf();
          // Remove key from needed to map keys list
          keys = _.without(keys, method);
        }
        // Check if map value is a array
        else if(_.isArray(entity[method])) {
          // Map response items to type instance
          entity[method] = _.map(response[key], (item) => mapper(item, entity[method][0]));
          // Remove key from needed to map keys list
          keys = _.without(keys, method);
        }
      });
      // Remove keys that had not mapped to response keys
      _.forEach(keys, (method) => delete entity[method]);
    }

    return entity;
  }

  return mapper;
}
