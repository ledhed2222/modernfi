module TokenHelper
  def decode_token(token)
    JWT.decode(
      token,
      ENV["APP_SECRET_KEY"],
      true,
      algorithm: "HS256",
    ).first
  rescue JWT::DecodeError
  end
end
