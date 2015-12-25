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
#  tutorial        :boolean          default(FALSE)
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

    Task.create!(type_id: habits.id, title: "Eat a fruit", money_reward: 3)
    Task.create!(type_id: habits.id, title: "Use the stairs", money_reward: 2)
    Task.create!(type_id: habits.id, title: "Use the elevator", money_reward: -3)
    Task.create!(type_id: dailies.id, title: "Floss", money_reward: 3)
    Task.create!(type_id: dailies.id, title: "Walk the dog", money_reward: 2)
    Task.create!(type_id: todos.id, title: "Complete the tutorial!", money_reward: 2)
    Task.create!(type_id: rewards.id, title: "Candy bar", money_reward: 5)
    Task.create!(type_id: rewards.id, title: "30min of video games", money_reward: 10)
  end

  def create__equipment_rewards
    rewards = self.task_types[3]

    # Hats
    party_hat_task = Task.create!(type_id: rewards.id, title: "Party Hat", money_reward: 0)
    Equipment.create!(name: "Party Hat", url: "assets/party_hat.png", type_name: "hat", task_id: party_hat_task.id)
    propeller_hat_task = Task.create!(type_id: rewards.id, title: "Propeller Hat", money_reward: 10)
    Equipment.create!(name: "Propeller Hat", url: "assets/propeller_hat.png", type_name: "hat", task_id: propeller_hat_task.id)
    construction_helmet_task = Task.create!(type_id: rewards.id, title: "Construction Helmet", money_reward: 20)
    Equipment.create!(name: "Construction Helmet", url: "assets/construction_helmet.png", type_name: "hat", task_id: construction_helmet_task.id)
    viking_helmet_task = Task.create!(type_id: rewards.id, title: "Viking Helmet", money_reward: 35)
    Equipment.create!(name: "Viking Helmet", url: "assets/viking_helmet.png", type_name: "hat", task_id: viking_helmet_task.id)

    # Swords
    banana_task = Task.create!(type_id: rewards.id, title: "Banana Sword", money_reward: 5)
    Equipment.create!(name: "Banana", url: "assets/banana.png", type_name: "sword", task_id: banana_task.id)
    shovel_task = Task.create!(type_id: rewards.id, title: "Shovel", money_reward: 12)
    Equipment.create!(name: "Shovel", url: "assets/shovel.png", type_name: "sword", task_id: shovel_task.id)
    dagger_task = Task.create!(type_id: rewards.id, title: "Dagger", money_reward: 18)
    Equipment.create!(name: "Dagger", url: "assets/dagger.png", type_name: "sword", task_id: dagger_task.id)
    fire_sword_task = Task.create!(type_id: rewards.id, title: "Fire Sword", money_reward: 60)
    Equipment.create!(name: "Fire Sword", url: "assets/fire_sword.png", type_name: "sword", task_id: fire_sword_task.id)
    light_saber_task = Task.create!(type_id: rewards.id, title: "Light Saber", money_reward: 60)
    Equipment.create!(name: "Light Saber", url: "assets/light_saber.png", type_name: "sword", task_id: light_saber_task.id)

    # Shields
    wooden_shield_task = Task.create!(type_id: rewards.id, title: "Wooden Shield", money_reward: 10)
    Equipment.create!(name: "Wooden Shield", url: "assets/wooden_shield.png", type_name: "shield", task_id: wooden_shield_task.id)
    gryffindor_shield_task = Task.create!(type_id: rewards.id, title: "Gryffindor Shield", money_reward: 30)
    Equipment.create!(name: "Gryffindor Shield", url: "assets/gryffindor_shield.png", type_name: "shield", task_id: gryffindor_shield_task.id)
    cap_shield_task = Task.create!(type_id: rewards.id, title: "Captain America Shield", money_reward: 40)
    Equipment.create!(name: "Captain America Shield", url: "assets/cap_shield.png", type_name: "shield", task_id: cap_shield_task.id)
  end
end
