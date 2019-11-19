Rails.application.routes.draw do
  devise_for :users
  root 'homes#index'
  get 'home/index', to: 'homes#index'
  get 'mypage/index', to: 'mypages#index'
  get 'mypage/edit', to: 'mypages#edit'
  get 'mypage/card', to: 'mypages#index'
  get 'mypage/logout', to: 'mypages#logout'
  get 'mypage/identification', to: 'mypages#identification'
  patch 'user_information/update'

  resources :signups, only: [:index] do
    collection do
      get 'step1'
      post 'step1', to: 'signups#step1_validates'
      get 'step2'
      post 'step2', to: 'signups#create'
      get 'done'
    end
  end
  resources :addresses, only: [:edit, :update, :delete] do
    collection do
      get "/", to: 'addresses#new'
      post "/", to: 'addresses#create'
    end
  end
  resources :addresses, only: [:new, :create]
  resources :creditcards, only: [:new, :create]
end
