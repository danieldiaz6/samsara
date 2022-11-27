// Below code will use functions in order to import two datasets
// Goal: At each stop pull Arrival and departure times with temperature readings. 

//Step 1 assign the responses to the below constants historicalData routeData
const historicalData = require("/Users/daniel/Desktop/Files/historicalstats.json");
const routeData = require("/Users/daniel/Desktop/Files/routeUpdates.json");


// using the routeStop variable which contains an array with all stop times
function getStopTimes(routeStops) {
  //Create a empty array which I will use later to add actual time of arrival at each stop
  const stopArrivalDateTimeObj = [];
  const stopDepartureDateTimeObj = [];
  // loop through stops of routeUpdates dates and times --https://www.w3schools.com/js/js_loop_forof.asp
  for (const stop of routeStops) {
    const stopActualArrivalTime = stop.actualArrivalTime;
    const stopActualDepartureTime = stop.actualDepartureTime;
    //last step of this function is to populate the array created above.
    stopArrivalDateTimeObj.push(stopActualArrivalTime);//='2022-10-03T12:05:40.837Z'
    stopDepartureDateTimeObj.push(stopActualDepartureTime);//='2022-10-03T12:05:40.837Z'

    // console.log(stopDateTimeObj)
}
  //element 0 contains the array with all arrival times
  //element 1 contains the array with all departure times
  return [stopArrivalDateTimeObj,stopDepartureDateTimeObj];
}

//using the GPS array pulling temperature and time
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
    
    // Start to end
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice 
  
    stops=stops.slice(0,stops.length-1)
    return stops
}

// Step 2 - Below function will call other functions in the code to retrieve the actual arrival and departure times as well as the temperature from the historical file. 
function getTemperatureAtStops(historicalData, routeData) {
  //Below pulling the routename
  const routeName = routeData.data.name;
  //create array of stops which contains route stops information like coordinates and actual arrival time
  const routeStops = routeData.data.stops;

  //Pulling the GPS array at position 0
  const historicalDataTemperatures = historicalData.data[0].gps;

 
// Step 3 pull the stop times(arrival/Departure) from the getStoptime function    
  const stopTimes = getStopTimes(routeStops);
  // pulling at each stop what was the departure and arrival time
  const stopArrivalDateTimeObj = stopTimes[0]
  const stopDepartureDateTimeObj = stopTimes[1]

  // Step 4 from the historical temperature constant (array) pull temperature and time values
  const histDateTimeObj = getHistoricalTimes(historicalDataTemperatures);

  //populating stops property within output object from line 84
  let stopArrival = []
  let stopDeparture = []
  // Step 5 using GetStopData function pull the arrival/departure times 
  stopArrival= getStopData(stopArrival, stopArrivalDateTimeObj, histDateTimeObj);
  stopDeparture= getStopData(stopDeparture, stopDepartureDateTimeObj, histDateTimeObj);

  return [stopArrival,stopDeparture];
}
////
const tempsAtActualStops = getTemperatureAtStops(historicalData, routeData);

console.log(tempsAtActualStops[0]);
console.log(tempsAtActualStops[1]);