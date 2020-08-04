import _ from 'lodash';

function throttle(wait = 2000, options) {
  const defaultOptions = {
    trailing: false,
    leading: true,
  };
  const opts = Object.assign({}, defaultOptions, options);

  return function inner(target, propertyKey, descriptor) {
    const originMethod = descriptor.value;
    const originMethodDebounced = _.throttle(originMethod, wait, opts);
    descriptor.value = function _inner(...args) {
      return originMethodDebounced.apply(this, args);
    };

    return descriptor;
  };
}

export { throttle };
