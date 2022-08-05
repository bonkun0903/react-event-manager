SAMPLE_TODOS = [
  {
    name: 'Going around the world!'
  },
  {
    name: 'graduating from colloge'
  },
  {
    name: 'publishinga book'
  }
]

SAMPLE_TODOS.each do |todo|
  Todo.create(todo)
end

json = ActiveSupport::JSON.decode(File.read('db/seeds/events.json'))
json.each do |record|
  Event.create!(record)
end