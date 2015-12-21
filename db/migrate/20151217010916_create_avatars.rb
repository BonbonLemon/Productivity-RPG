class CreateAvatars < ActiveRecord::Migration
  def change
    create_table :avatars do |t|
      t.integer :user_id, null: false
      t.integer :money, null: false, default: 0
      t.integer :sword_id
      t.integer :shield_id
      t.integer :hat_id

      t.timestamps null: false
    end

    add_index :avatars, :user_id, unique: true
    add_index :avatars, :sword_id
    add_index :avatars, :shield_id
    add_index :avatars, :hat_id
  end
end
