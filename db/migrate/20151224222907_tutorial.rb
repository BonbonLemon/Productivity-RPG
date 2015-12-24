class Tutorial < ActiveRecord::Migration
  def change
    add_column :users, :tutorial, :boolean, default: false
  end
end
