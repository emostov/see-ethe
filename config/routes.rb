# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create]
    resource :session, only: %i[create destroy show]
    resources :address_type_tags, only: %i[show index]
  end

  root 'static_pages#root'
end
