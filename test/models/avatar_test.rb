# == Schema Information
#
# Table name: avatars
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  money      :integer          default(0), not null
#  sword_id   :integer
#  shield_id  :integer
#  hat_id     :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class AvatarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
