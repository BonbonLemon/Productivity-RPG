json.array! @task_types do |task_type|
  json.id task_type.id
  json.type_name task_type.type_name

  json.tasks task_type.tasks do |task|
    json.title task.title
    json.money_reward task.money_reward
  end
end