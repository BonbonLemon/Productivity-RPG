class CreateAvatars < ActiveRecord::Migration
  def change
    create_table :avatars do |t|
      t.integer :user_id, null: false
      t.integer :money, null: false, default: 0

      t.timestamps null: false
    end

    add_index :avatars, :user_id, unique: true
  end
end
