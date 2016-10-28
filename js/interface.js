$(document).ready(function(){

  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature();
    $('#temperature').attr('class', thermostat.displayUsage());
    $('#energy-usage').text(thermostat.displayUsage());
  }

//---INITIALISATION --- //
  $('#temperature').text(thermostat.temperature());

  $('#temperature').attr('class', thermostat.displayUsage());

  $('#energy-usage').text(thermostat.displayUsage());

  displayWeather("London")
//---END---//

  $('#temp-up').on('click', function(){
    thermostat.up();
    updateTemperature();
  })

  $('#temp-down').on('click', function() {
    thermostat.down();
    updateTemperature();
  })

  $('#reset').on('click', function() {
    thermostat.reset();
    updateTemperature();
  })

  $('#powersaving-on').on('click', function() {
    thermostat.savingPowerOn();
    $('#power-saving-status').text("on");
  })

  $('#powersaving-off').on('click', function() {
    thermostat.savingPowerOff();
    $('#power-saving-status').text("off");
  })

  function displayWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=4abce62c7fe66553d73a13bfd9ebed0b';
    var units = '&units=metric';
    $.get(url + token + units, function(data){
      $('#current-temperature').text(data.main.temp);
    })
  }

  $('#current-city').change(function() {
    var city = $('#current-city').val();
    displayWeather(city)
  })

  $('#select-city').submit(function(event) {
    event.preventDefault();
    var city = $('#selected-city').val();
    $.ajax({
     statusCode: {
      502: function () {
        alert('Fail!');
        }
     }
  })
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
      $('#select-temperature').text(data.main.temp);
    })
  })
})
