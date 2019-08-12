Rails.application.routes.draw do
  resources :hunted_tasks
  root "home#index"
end
