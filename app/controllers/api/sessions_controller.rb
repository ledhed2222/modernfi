class Api::SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      expiration_time = Time.now.to_i + (3600 * 3)
      payload = {
        user_id: user.id,
        expiration: expiration_time,
      }
      token = JWT.encode(
        payload,
        ENV["APP_SECRET_KEY"],
        "HS256",
      )
      render json: { token: token }
    else
      head :bad_request
    end
  end

  def destroy
    token = extract_token_from_request
    if token
      begin
        payload = JWT.decode(
          token,
          ENV["APP_SECRET_KEY"],
          true,
          algorithm: "HS256",
        ).first
        payload["exp"] = Time.now.to_i
        JWT.encode(
          payload,
          ENV["APP_SECRET_KEY"],
          "HS256",
        )
        head :ok
      rescue JWT::DecodeError
        head :bad_request
      end
    else
      head :unprocessable_entity
    end
  end
end
