class TreasuryOrder < ApplicationRecord
  belongs_to :user

  validates :term, presence: true
  validates :amount, presence: true
  validates :user, presence: true
end
