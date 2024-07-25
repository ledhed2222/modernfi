class User < ApplicationRecord
  has_many :treasury_orders

  validates :name, presence: true
  validates_uniqueness_of :name
  validates :password, presence: true

  has_secure_password
end
