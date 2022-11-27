const sdk = require('api')('@samsara-dev-rel/v2019.01.01#bcxnht13l8p3g62d');

sdk.auth('samsara_api_');
sdk.server('https://api.samsara.com');
sdk.fetchRoute({id: '9000368750'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
