# == Schema Information
#
# Table name: task_types
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  type_name  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TaskType < ActiveRecord::Base
  validates :user_id, :type_name, presence: true

  belongs_to :user

  has_many :tasks,
    class_name: "Task",
    foreign_key: :type_id,
    primary_key: :id
end
