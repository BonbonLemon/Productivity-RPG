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

require 'test_helper'

class TaskTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
