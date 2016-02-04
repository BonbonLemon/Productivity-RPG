# == Schema Information
#
# Table name: inventories
#
#  id         :integer          not null, primary key
#  avatar_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Inventory < ActiveRecord::Base
  validates :avatar_id, presence: true

  belongs_to :avatar,
    dependent: :destroy

  has_many :tasks
end
