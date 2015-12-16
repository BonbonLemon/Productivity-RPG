class CreateTaskTypes < ActiveRecord::Migration
  def change
    create_table :task_types do |t|
      t.integer :user_id, null: false
      t.string :type_name, null: false

      t.timestamps null: false
    end

    add_index :task_types, :user_id
  end
end
