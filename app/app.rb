require 'sinatra/base'
require_relative 'models/thermostat_state'
require 'open-uri'
require 'json'
require 'ostruct'

class Thermostat < Sinatra::Base
  get '/' do
    thermostat_state = ThermostatState.first_or_create
    erb(:index)
  end

  post '/thermostat/update' do
     # in case someone already read it
    # data = JSON.parse(data, object_class: OpenStruct)
    thermostat_state = ThermostatState.first_or_create
    thermostat_state.update(:temperature => params[:temp], :city => params[:city], :power_saving => params[:power_saving]) #temp=10
  end

  get '/mydata' do
    thermostat_state = ThermostatState.get(1)
    p thermostat_state[:city]
  end

=begin
$.ajax({ type: 'POST', dataType: 'json', url: '/thermostat/update', data : { temp: 10},
      success: function(json) {
        alert('all done');
      } })
=end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
