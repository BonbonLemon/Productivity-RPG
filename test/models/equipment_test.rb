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

require 'test_helper'

class EquipmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
