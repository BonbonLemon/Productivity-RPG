class CreateEquipment < ActiveRecord::Migration
  def change
    create_table :equipment do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :type_name, null: false
      t.integer :task_id, null: false
      t.integer :avatar_id

      t.timestamps null: false
    end

    add_index :equipment, :task_id, unique: true
    add_index :equipment, :avatar_id
  end
end
