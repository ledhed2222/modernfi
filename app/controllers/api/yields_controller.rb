require "net/http"

class Api::YieldsController < ApplicationController
  API_URI = URI("https://www.ustreasuryyieldcurve.com/api/v1/yield_curve_snapshot")
  private_constant :API_URI

  def show
    request = Net::HTTP::Get.new(API_URI).tap do |req|
      req.body = JSON.generate({
        date: Time.now.strftime("%Y-%m-%d"),
        offset: 0,
      })
    end

    Net::HTTP.start(API_URI.hostname, API_URI.port, use_ssl: true) do |http|
      http.request(request)
    end.yield_self do |response|
      JSON.parse(response.body).first.with_indifferent_access
    end.map do |key, value|
      match = /yield_(\d{1,2})([my])/.match(key)
      if match.present?
        term_value, unit = match.captures
        term_value = Integer(term_value)
        term_value *= 12 if unit == "y"
        {
          term: term_value,
          rate: value,
        }
      else
        nil
      end
    end.compact.yield_self do |payload|
      render json: payload
    end
  end
end
