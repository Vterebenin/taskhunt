class CreateHuntedTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :hunted_tasks do |t|
      t.boolean :isHunted
      t.string :TaskTitle
      t.text :TaskDesc
      t.integer :TaskId

      t.timestamps
    end
  end
end
