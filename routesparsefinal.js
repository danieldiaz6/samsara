const historicalData = require("/Users/daniel/Desktop/Files/historicalstats.json");
const routeData = require("/Users/daniel/Desktop/Files/routeUpdates.json");

function getStopTimes(routeStops) {
  //Create a empty array which I will use later to add actual time of arrival at each stop
  const stopArrivalDateTimeObj = [];
  const stopDepartureDateTimeObj = [];
  // loop through stops of routeUpdates dates and times --https://www.w3schools.com/js/js_loop_forof.asp
  for (const stop of routeStops) {
    const stopActualArrivalTime = stop.actualArrivalTime;
    const stopActualDepartureTime = stop.actualDepartureTime;
    //last step of this function is to populate the array created above.
    stopArrivalDateTimeObj.push(stopActualArrivalTime);//stopDateTimeObj='2022-10-03T12:05:40.837Z'
    stopDepartureDateTimeObj.push(stopActualDepartureTime);//stopDateTimeObj='2022-10-03T12:05:40.837Z'

    // console.log(stopDateTimeObj)
}
  //element 0 contains the array with all arrival times
  //element 1 contains the array with all departure times
  return [stopArrivalDateTimeObj,stopDepartureDateTimeObj];
}

function getHistoricalTimes(historicalDataTemperatures) {
  //Create a empty array which I will use later to add temperature and time
  const histDateTimeObj = [];
  
    for (const histDataPoint of historicalDataTemperatures) {
      const temp = histDataPoint.decorations.ambientAirTemperatureMilliC.value; // 16000
  
      histDateTimeObj.push([histDataPoint.time,temp]);
    }
    // console.log(histDateTimeObj)
    return histDateTimeObj;
}

function getStopData(stops, stopArrivalDateTimeObj, histDateTimeObj) {
  //loop through stopArrivalDateTimeObj and compare dates <= 1 min differece with
  //histDateTimeObj in order to populate outputObj with date and temps
  let count = 0
  for (const stopTime of stopArrivalDateTimeObj) {
          //convert string to date time object
        const dateStop = new Date(stopTime); //2022-10-03T12:05:40.837Z
        for (const dateTemps of histDateTimeObj) {
          //convert string to date time object
          // Saving to each constant the element of date temps array (element 0) and second element which is element (1)
            const dateHistorical = new Date(dateTemps[0]);
            const temp = dateTemps[1]; //16000
             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
            // gettime method returns number in milliseconds 
            let diff = (dateStop.getTime() - dateHistorical.getTime()) / 1000;
          diff /= 60;
          const actualDiffMins = Math.abs(Math.round(diff));

          if (actualDiffMins <= 0.5) {
            stops.push([`stop:${count}`,stopTime, temp]);
            {
              break;
            }
          }
      }
      count++
    }
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice 
    stops=stops.slice(0,stops.length-1)
    return stops
}
//Create Function which imports two datasets
// 1. Vehicle Historical Data
// 2. Fetch Route Information
// 3. Call other functions to retrieve Actual Stop Times and Vehicle historical data to pull temperature values
// 4. Ultimate goal to be able to match actual arrival time with temperature value at that time.
function getTemperatureAtStops(historicalData, routeData) {
  //Below pulling the routename
  const routeName = routeData.data.name;
  //create array of stops which contains route stops information like coordinates and actual arrival time
  const routeStops = routeData.data.stops;

  //Pulling the GPS array at position 0
  const historicalDataTemperatures = historicalData.data[0].gps;

    //reference a function below which is the getstoptimes function
    // I pass the previous created array routestops which contains stop information
    // Below I define two varilables stopDateTimeObj and histDateTimeObj
    // stopDateTimeObj I am going to call a function that will help me pull the date and actual arrival time.
    // getStopTimes  contains both ARrival and departure in the stops array
  
  const stopTimes = getStopTimes(routeStops);
  //
  const stopArrivalDateTimeObj = stopTimes[0]
  const stopDepartureDateTimeObj = stopTimes[1]
  const histDateTimeObj = getHistoricalTimes(historicalDataTemperatures);

  //populating stops property within output object from line 84
  let stopArrival = []
  let stopDeparture = []

  stopArrival= getStopData(stopArrival, stopArrivalDateTimeObj, histDateTimeObj);
  stopDeparture= getStopData(stopDeparture, stopDepartureDateTimeObj, histDateTimeObj);
    // console.log(stopDateTimeObj);
    // console.log(histDateTimeObj);
    // console.log(outputObject);

  return [stopArrival,stopDeparture];
}
////
const tempsAtActualStops = getTemperatureAtStops(historicalData, routeData);

console.log(tempsAtActualStops[0]);
console.log(tempsAtActualStops[1]);