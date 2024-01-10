var apiKey = '1b40400f4b124f32b20164627240701';

var city = 'alexandria';

var citydiv = document.querySelector('.citydiv');

var citytemp = document.querySelector('.citytemp');
var windspeed = document.querySelector('.windspeed');


var dateday = document.querySelector('.dateday');
var monthdate = document.querySelector('.monthdate');
var humidi = document.querySelector('.humidi');
var searchbox = document.querySelector('.searching input');

var searchbtn = document.querySelector('.searching button');

var thecitymain = 'alexandria';

const currentDate = new Date();
const day = currentDate.getDay();;

const daysee = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = currentDate.getMonth();
const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const themonthe = monthNames[month];   // current month name

const currentmoth = themonthe;
const thedaye = daysee[day];           // current day name
const currentday = thedaye;
const dayOfMonth = currentDate.getDate();


// Calculate tomorrow's day name
const tomorrow = new Date(currentDate);
tomorrow.setDate(currentDate.getDate() + 1);
const tomorrowDayIndex = tomorrow.getDay();
const tomorrowDayName = daysee[tomorrowDayIndex];
// calculate day after tomorrow's day 

const dayAfterTomorrow = new Date(currentDate);
dayAfterTomorrow.setDate(currentDate.getDate() + 2);
const dayAfterTomorrowIndex = dayAfterTomorrow.getDay();
const dayAfterTomorrowName = daysee[dayAfterTomorrowIndex];

async function checkweather(thelocation) {
    var cityplayed;
    if (thelocation === ' ') {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=alexandria`);
        var data = await response.json();
        cityplayed = 'alexandria';
    }
    else {
        cityplayed = thelocation;
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityplayed}`);
        var data = await response.json();
    }






    var cityName = data.location.name;
    var cityTemp = data.current.temp_c;
    var winddegree = data.current.wind_degree;
    var statuscity = data.current.condition.text;

    var currenthumidity = data.current.humidity;
    const currentcoditionimg = `https:${data.current.condition.icon}`;


    console.log("Image URL:", currentcoditionimg);
    console.log(typeof (currentcoditionimg));


    displaycurrent(thedaye, themonthe, dayOfMonth, currenthumidity, cityName, cityTemp, winddegree, statuscity, currentcoditionimg);
}





;


async function forcastingNextTwodaysWeather(thelocation) {
    var cityplayed;
    if (thelocation === ' ') {
        cityplayed = 'alexandria';
    }
    else {
        cityplayed = thelocation;
    }



    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1b40400f4b124f32b20164627240701&q=${cityplayed}&days=7`);

    var data = await response.json();
    //--------------------------------------------------------------------------------------------------------

    //                                   next day     
    var nextdayMaxTemp = data.forecast.forecastday[0].day.maxtemp_c;
    var nextdayMinTemp = data.forecast.forecastday[0].day.mintemp_c;
    var nextdayState = data.forecast.forecastday[0].day.condition.text ;
    var iconNext = `https:${data.forecast.forecastday[0].day.condition.icon}`;
    // --------------------------------------------------------------------------------------------------------

    //                                 next Next day

    var nextNextMaxTemp = data.forecast.forecastday[1].day.maxtemp_c;
    var nextNextMinTemp = data.forecast.forecastday[1].day.mintemp_c;
    var nextNextState = data.forecast.forecastday[1].day.condition.text ;
    var iconNextnext = `https:${data.forecast.forecastday[1].day.condition.icon}`;


    displayNextDay(nextdayMaxTemp,nextdayMinTemp,nextdayState,iconNext ,tomorrowDayName)  ;
    displayNextafter(nextNextMaxTemp,nextNextMinTemp,nextNextState,iconNextnext,dayAfterTomorrowName);

  


}

function displayNextafter(nextNextMaxTemp,nextNextMinTemp,nextNextState,iconNextnext,dayAfterTomorrowName){
    var cartona = " " ;

    cartona= `
               
    <div class="tiltecalendernextnext">
    <div class="nextdayname text-center">
      ${dayAfterTomorrowName}
    </div>
  </div>
  <div class="containerinfonextNext">
    
    <div class="row d-flex flex-column align-items-center">
      <div class="col-lg-12 w-75">
        <img src="${iconNextnext}"  class="w-100"> 
      </div>
      <div class="col-lg-12">
        <h2 class="display-3 nxtnextmaxtemp">${nextNextMaxTemp} °C</h2>
        <small class="fw-bolder" >${nextNextMinTemp} °C</small>
      </div>

      
    

    <div class="statusnext text-primary">
      <p class="  px-3">${nextNextState}</p>
    </div>
  </div>

    

  </div>

    
    
    
    ` ;
    document.querySelector('.nextNextdayvalue').innerHTML = cartona ;


}

function displayNextDay(nextdayMaxTemp,nextdayMinTemp,nextdayState,iconNext,tomorrowDayName ) {
    var cartona = "";

    cartona = `  
    <div class="tiltecalendernext">
    <div class="nextdayname text-center">
      ${tomorrowDayName}
    </div>
  </div>
  <div class="containerinfonext">
    
    <div class="row d-flex flex-column align-items-center">
      <div class="col-lg-12 w-75">
        <img src="${iconNext}"  class="w-100"> 
      </div>
      <div class="col-lg-12">
        <h2 class="display-3 nxtmaxtemp">${nextdayMaxTemp} °C</h2>
        <small class="fw-bolder" >${nextdayMinTemp} °C</small>
      </div>

      
    

    <div class="statusnext text-primary">
      <p class="  px-3">${nextdayState}</p>
    </div>
  </div>

    

  </div>
    
    
    
    
    
    ` ;

    document.querySelector('.nextdayvalue').innerHTML = cartona ;
}

function displaycurrent(daycurrent, monthcurrent, dayOfMonth, humiditycurrent, cityName, temp, winddegree, statuscity, currentcoditionimg) {

    var cartona = "";

    cartona = `

    <div class="tiltecalender">
    <div class="d-flex justify-content-between ">
        <div class="nowday">${daycurrent}</div>
        <div class="d-flex"><div class="dateday">${dayOfMonth}</div><div class="monthdate">${monthcurrent}</div></div>
    </div>
</div>
<div class="containerinfo">
    <div class="py-5 px-3 citydiv fw-bolder display-3">
        ${cityName}
    </div>
    <div class="row d-flex align-items-center">
       <div class="col-lg-6"><h2 class="display-3 citytemp"> ${temp} °C</h2></div>
       
       <div class="col-lg-6"><img src= "${currentcoditionimg}"  class="w-100"> </div>
    </div>

    <div class="status">
        <p class="  px-3">${statuscity}</p>
    </div>

    <div class="row p-1 smalldetails gy-2">
        <div class="d-flex  col-sm-4 "><img src="./images/icon-umberella.png" alt=""> <p class="px-2 humidi">${humiditycurrent}</p></div>
        <div class="d-flex  col-sm-4"> <img src="./images/icon-wind.png" alt=""><p class="px-2 windspeed">${winddegree}km/h</p></div>
        <div class=" d-flex col-sm-4"><img src="./images/icon-compass.png" class="px-2" alt=""><p >East</p></div>
    </div>

</div>
    
    
    `
    document.querySelector('.currentvalue').innerHTML = cartona;
}
searchbtn.addEventListener('click', () => {
    checkweather(searchbox.value);
    forcastingNextTwodaysWeather(searchbox.value) ; 
    
})