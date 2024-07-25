class ApplicationController < ActionController::API
  include TokenHelper

  def extract_token_from_request
    request.headers["Cookie"]&.split(";")&.map do |cookie|
      cookie.strip.split("=")
    end&.find do |cookie|
      cookie.first == "token"
    end&.last
  end

  def authorize_user
    payload = decode_token(extract_token_from_request)
    if payload.present?
      @current_user = User.find(payload["user_id"])
    else
      head :unauthorized
    end
  end
end
