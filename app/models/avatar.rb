# == Schema Information
#
# Table name: avatars
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  money      :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Avatar < ActiveRecord::Base
  validates :user_id, :money, presence: true
  validates :user_id, uniqueness: true

  belongs_to :user
end
