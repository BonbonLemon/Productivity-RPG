# == Schema Information
#
# Table name: tasks
#
#  id           :integer          not null, primary key
#  type_id      :integer          not null
#  title        :string           not null
#  money_reward :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  inventory_id :integer
#  completed    :boolean          default(FALSE)
#

class Task < ActiveRecord::Base
  validates :type_id, :title, :money_reward, presence: true

  belongs_to :task_type,
    class_name: "TaskType",
    foreign_key: :type_id,
    primary_key: :id

  belongs_to :inventory

  has_one :user,
    through: :task_type,
    source: :user,
    dependent: :destroy

  has_one :avatar,
    through: :user,
    source: :avatar

  has_one :equipment
end
