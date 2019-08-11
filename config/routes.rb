Rails.application.routes.draw do
  resources :hunted_tasks, :action => 'handle_options_request'
  root "home#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  def handle_options_request
    headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT'
    headers['Access-Control-Max-Age'] = '1000'
    headers['Access-Control-Allow-Headers'] = '*,x-requested-with'
    head(:ok) if request.request_method == "OPTIONS"
  end
end
