json.extract! hunted_task, :id, :isHunted, :TaskTitle, :TaskDesc, :TaskId, :created_at, :updated_at
json.url hunted_task_url(hunted_task, format: :json)
