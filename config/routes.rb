Rails.application.routes.draw do
  root to: redirect('/events')
  
  get 'todos', to: 'site#index'
  get 'todos/new', to: 'site#index'
  get 'todos/:id/edit', to: 'site#index'

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/:edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      delete 'todos/destroy_all', to: 'todos#destroy_all'
      resources :todos, only: %i[index show create update destroy]
      resources :events, only: %i[index show create update destroy]
    end
  end
end
