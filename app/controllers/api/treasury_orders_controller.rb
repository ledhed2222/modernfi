class Api::TreasuryOrdersController < ApplicationController
  before_action :authorize_user, only: [:create]

  def create
    order = @current_user.treasury_orders.build(treasury_order_params)
    if order.save
      head :ok
    else
      puts order.errors.details
      head :bad_request
    end
  end

  private

  def treasury_order_params
    params.require(:treasury_order).permit(
      :term,
      :amount,
    )
  end
end
