class Api::UsersController < ApplicationController
  before_action :authorize_user, only: [:show_orders]

  def create
    user = User.new(user_params)
    if user.save
      head :ok
    else
      head :conflict
    end
  end

  def show_orders
    # TODO - pagination
    render json: {
      user_id: @current_user.id,
      orders: @current_user.treasury_orders.order(created_at: :asc),
    }
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
