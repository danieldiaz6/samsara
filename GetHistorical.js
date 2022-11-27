const sdk = require('api')('@samsara-dev-rel/v2019.01.01#bcxnht13l8p3g62d');

sdk.auth('samsara_api_cWGSdteERfBXwHhc56MYKN3CH4pLvt');
sdk.getVehicleStatsHistory({
  startTime: '2022-10-03T12%3A00%3A00Z',
  endTime: '2022-10-03T14%3A00%3A00.003Z',
  vehicleIds: '281474982642912',
  types: 'ambientAirTemperatureMilliC,gps',
  decorations: 'ambientAirTemperatureMilliC,gps'
})
  .then(res => console.log(res))
  .catch(err => console.error(err));