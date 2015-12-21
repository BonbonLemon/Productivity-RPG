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
#  equipment_id :integer
#

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
