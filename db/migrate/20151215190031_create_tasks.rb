class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :type_id, null: false
      t.string :title, null: false
      t.integer :money_reward, null: false

      t.timestamps null: false
    end

    add_index :tasks, :type_id
  end
end
