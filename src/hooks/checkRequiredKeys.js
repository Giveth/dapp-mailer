import errors from '@feathersjs/errors';

export default (requiredKeys, data) => {
  if (!requiredKeys.every(k => k in data)) {
    throw new errors.BadRequest();
  }
}