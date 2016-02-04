class CreateInventories < ActiveRecord::Migration
  def change
    create_table :inventories do |t|
      t.integer :avatar_id, null: false

      t.timestamps null: false
    end

    add_column :tasks, :inventory_id, :integer

    change_column_default :avatars, :money, 50
    add_column :tasks, :completed, :boolean, default: false
  end
end
