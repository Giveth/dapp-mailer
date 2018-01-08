import errors from '@feathersjs/errors';

export default () => hook => {
  const { app } = hook;

  // make sure the authorization header is set
  if(hook.params.headers['authorization'] !== app.get('apiSecret')) {
    throw new errors.NotAuthenticated('Not authorized');
  }

  return hook;
}