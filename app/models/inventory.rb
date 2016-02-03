# == Schema Information
#
# Table name: inventories
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Inventory < ActiveRecord::Base
  validates :user_id, presence: true

  belongs_to :user

  has_many :tasks
end
