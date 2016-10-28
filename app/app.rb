require 'sinatra/base'
require_relative 'models/thermostat_state'
require 'open-uri'
require 'json'

class Thermostat < Sinatra::Base
  get '/' do
    erb(:index)
  end

  post '/thermostat/update', :provides => :json do
    request.body.rewind  # in case someone already read it
    params = JSON.parse(request.env["rack.input"].read)
    p params[:temp]
  end

=begin
var data = { temp: 10, city: "Edinburgh"}
$.ajax({ type: 'POST', dataType: 'json', url: '/thermostat/update', data : JSON.stringify(data),
      success: function(json) {
        alert('all done');
      } })
=end

  # start the server if ruby file executed directly
  run! if app_file == $0
end
