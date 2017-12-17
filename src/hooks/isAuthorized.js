import errors from '@feathersjs/errors';

export default () => hook => {
  const { app } = hook;
  const apiSecret = app.get('env') === 'development' ? app.get('apiSecret') : process.env.API_SECRET;

  // make sure the authorization header is set
  if(hook.params.headers['authorization'] !== apiSecret) {
    throw new errors.NotAuthenticated('Not authorized');
  }

  return hook;
}