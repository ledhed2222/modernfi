Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  namespace :api do
    get "up" => "rails/health#show", as: :rails_health_check

    # Defines the root path route ("/")
    # root "posts#index"
    resources :users, only: [:create]
    get "/users/orders", to: "users#show_orders"

    resources :treasury_orders, only: [:create]

    post "/sessions", to: "sessions#create"
    delete "/sessions", to: "sessions#destroy"

    get "/yields", to: "yields#show"
  end
end
