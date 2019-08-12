class AddingColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :hunted_tasks, :author, :string
    add_column :hunted_tasks, :deadline, :string
    add_column :hunted_tasks, :priority, :string
    add_column :hunted_tasks, :status, :string
    add_column :hunted_tasks, :project, :string
    add_column :hunted_tasks, :estimated_hours, :float
  end
end
