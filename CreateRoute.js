const sdk = require('api')('@samsara-dev-rel/v2019.01.01#bcxnht13l8p3g62d');

sdk.auth('samsara_api_cWGSdteERfBXwHhc56MYKN3CH4pLvt');
sdk.createRoute({
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
      name: 'Terminal',
      scheduledDepartureTime: '2022-10-06T12:00:00Z'
    },
    {
      singleUseLocation: {
        address: '755 Battery Ave SE, Atlanta, GA 30339',
        latitude: 33.89271224638631,
        longitude: -84.46859368071296
      },
      name: 'Stop #1',
      notes: 'Customer site 1',
      scheduledArrivalTime: '2022-10-06T12:15:00Z',
      scheduledDepartureTime: '2022-10-06T12:30:00Z'
    },
    {
      singleUseLocation: {
        address: '5610 Glenridge Dr, Sandy Springs, GA 30342',
        latitude: 33.90867723726532,
        longitude: -84.36309057850764
      },
      name: 'Stop #2',
      notes: 'Customer Site 2',
      scheduledArrivalTime: '2022-10-06T12:45:00Z',
      scheduledDepartureTime: '2022-10-06T13:00:00Z'
    },
    {
      singleUseLocation: {
        address: '1170 Peachtree St NE, Atlanta, GA 30309',
        latitude: 33.78657395110958,
        longitude: -84.38377531683527
      },
      name: 'Stop #3',
      notes: 'Customer site 3',
      scheduledArrivalTime: '2022-10-06T13:20:00Z',
      scheduledDepartureTime: '2022-10-06T13:30:00Z'
    },
    {
      singleUseLocation: {
        address: '2 Interlock Ave NW, Atlanta, GA 30318',
        latitude: 33.785099055865444,
        longitude: -84.40995077100422
      },
      name: 'Terminal',
      scheduledArrivalTime: '2022-10-06T14:00:00Z'
    }
  ],
  name: 'Parliament Trucking Demo',
  vehicleId: '281474982642912'
})
  .then(res => console.log(res))
  .catch(err => console.error(err));