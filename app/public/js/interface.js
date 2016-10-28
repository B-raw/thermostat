$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();

  $('#temperature-up').on('click', function() {
    thermostat.upButton();
    updateTemperature();
  })

  $('#temperature-down').on('click', function() {
    thermostat.downButton();
    updateTemperature();
  })

  $('#temperature-reset').on('click', function() {
    thermostat.reset();
    updateTemperature();
  })

  $('#powersaving-toggle').on('click', function() {
    thermostat.togglePowerSavingMode();
    updatePowerSavingStatus();
    updateTemperature();
  })

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.energyUsage());
    postTemperature();
  }

  function updatePowerSavingStatus() {
    if (thermostat.powerSavingMode === true){
      $('#power-saving-status').text("ON");
      $('#power-saving-status').attr('class', 'low-usage');
    } else if (thermostat.powerSavingMode === false) {
      $('#power-saving-status').text("OFF");
      $('#power-saving-status').attr('class', 'high-usage');
    };
  }

  $('#weather-form').submit(function(event){

		event.preventDefault();
		var city = $("#location-input").val();
		var firstHalf = "http://api.openweathermap.org/data/2.5/weather?q="
		var secondHalf = "&APPID=d631f9336b0f36782ae2b6e3d513d46e&units=metric"
		$.get(firstHalf + city + secondHalf, function(data) {
			$('#location').text(data.name);
	  	$('#data-temp').text(data.main.temp+'C');
	  	$('#weather-description').text(data.weather[0].description);
		});
	});

  function postTemperature() {
    var data = {temp: thermostat.temperature, city: $("#location").text(), power_saving: thermostat.powerSavingMode};

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/thermostat/update',
      data : data,
      success: function(json) {
          console.log("This is what my server gives: ", data);
      }
    });
  };

});




// $.ajax({ type: 'POST', url: '/thermostat/update', data: 10 })

//
