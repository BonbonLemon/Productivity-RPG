# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true }

  attr_reader :password

  has_many :task_types

  has_one :avatar

  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user.try(:is_password?, password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def create_profile_items
    TaskType.create(user_id: self.id, type_name: "Habits")
    TaskType.create(user_id: self.id, type_name: "Dailies")
    TaskType.create(user_id: self.id, type_name: "To-dos")
    TaskType.create(user_id: self.id, type_name: "Rewards")
    Avatar.create(user_id: self.id)
  end

  def create_tutorial_tasks
    types = self.task_types
    habits = types[0]
    dailies = types[1]
    todos = types[2]
    rewards = types[3]

    Task.create!(type_id: habits.id, title: "Complete tasks by clicking on them!", money_reward: 2)
    Task.create!(type_id: habits.id, title: "Habits will exist until you delete them", money_reward: 2)
    Task.create!(type_id: habits.id, title: "Eat a fruit", money_reward: 3)
    Task.create!(type_id: habits.id, title: "Use the stairs", money_reward: 3)
    Task.create!(type_id: dailies.id, title: "Create your own tasks in the box above", money_reward: 2)
    Task.create!(type_id: dailies.id, title: "Floss", money_reward: 2)
    Task.create!(type_id: todos.id, title: "Click on me!", money_reward: 2)
    Task.create!(type_id: rewards.id, title: "Spend gold and reward yourself!", money_reward: 0)
    Task.create!(type_id: rewards.id, title: "Candy bar", money_reward: 2)
    Task.create!(type_id: rewards.id, title: "30min of video games", money_reward: 2)
  end

  def create__equipment_rewards
    rewards = self.task_types[3]

    banana_task = Task.create!(type_id: rewards.id, title: "Banana Sword", money_reward: 0)
    Equipment.create!(name: "Banana", url: "assets/banana.png", type_name: "sword", task_id: banana_task.id)
    shovel_task = Task.create!(type_id: rewards.id, title: "Shovel", money_reward: 0)
    Equipment.create!(name: "Shovel", url: "assets/shovel.png", type_name: "sword", task_id: shovel_task.id)
  end
end
