# == Schema Information
#
# Table name: equipment
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  url        :string           not null
#  type_name  :string           not null
#  task_id    :integer          not null
#  avatar_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Equipment < ActiveRecord::Base
  validates :name, :url, :type_name, :task_id, presence: true

  belongs_to :avatar,
    dependent: :destroy

  belongs_to :task
end
