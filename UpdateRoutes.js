const sdk = require('api')('@samsara-dev-rel/v2019.01.01#bcxnht13l8p3g62d');

sdk.auth('samsara_api_');
sdk.server('https://api.samsara.com');
sdk.patchRoute({
  settings: {
    routeCompletionCondition: 'arriveLastStop',
    routeStartingCondition: 'departFirstStop'
  },
  stops: [
    {
      singleUseLocation: {
        address: '2 Interlock Ave NW, Atlanta, GA 30318',
        latitude: 33.785099055865444,
        longitude: -84.40995077100422
      },
      id: '9000762295',
      name: 'Terminal Departures',
      scheduledDepartureTime: '2022-10-09T12:00:00.000Z'
    },
    {
      id: '9000762296',
      notes: 'Customer site 1',
      name: 'Stop #1',
      scheduledArrivalTime: '2022-10-09T12:15:00.000Z',
      scheduledDepartureTime: '2022-10-09T12:30:00.000Z'
    },
    {
      singleUseLocation: {
        address: '5610 Glenridge Dr, Sandy Springs, GA 30342',
        latitude: 33.90867723726532,
        longitude: -84.36309057850764
      },
      id: '9000762297',
      name: 'Stop #2',
      notes: 'Customer Site 2',
      scheduledArrivalTime: '2022-10-09T12:45:00.000Z',
      scheduledDepartureTime: '2022-10-09T13:00:00.000Z'
    },
    {
      singleUseLocation: {
        address: '1170 Peachtree St NE, Atlanta, GA 30309',
        latitude: 33.78657395110958,
        longitude: -84.38377531683527
      },
      id: '9000762298',
      name: 'Stop #3',
      notes: 'Customer site 3',
      scheduledDepartureTime: '2022-10-09T13:30:00.000Z',
      scheduledArrivalTime: '2022-10-09T13:20:00.000Z'
    },
    {
      singleUseLocation: {
        address: '2 Interlock Ave NW, Atlanta, GA 30318',
        latitude: 33.785099055865444,
        longitude: -84.40995077100422
      },
      name: 'Terminal',
      id: '9000762299',
      scheduledArrivalTime: '2022-10-09T14:00:00.000Z'
    }
  ],
  name: 'PCas',
  vehicleId: '281474982642912'
}, {id: '9000368757'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
