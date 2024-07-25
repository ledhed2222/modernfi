require "securerandom"

ENV["APP_SECRET_KEY"] = SecureRandom.hex(32)
