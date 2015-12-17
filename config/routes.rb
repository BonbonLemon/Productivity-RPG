Rails.application.routes.draw do
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:index, :show, :create, :destroy, :update]
    resources :task_types, only: [:index, :show, :create, :destroy, :update]
  end

  root to: "static_pages#root"
end
