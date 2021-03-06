Rails.application.routes.draw do
  resources :users, only: [:create, :new, :update]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:index, :show, :create, :destroy, :update]
    resources :task_types, only: [:index, :show, :create, :destroy, :update]
    resources :avatar, only: [:index, :update]
  end

  root to: "static_pages#root"
end
