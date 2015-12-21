class Api::AvatarController < ApplicationController
  def index
    @avatar = current_user.avatar
    render :show
  end

  def show
    @avatar = current_user.avatar
  end

  def update
    @avatar = current_user.avatar
    reward_money = task_params['money_reward'].to_i
    if task_params['task_type']['type_name'] == "Rewards"
      @avatar.money -= reward_money
    else
      @avatar.money += reward_money
    end

    equipment_from_params = task_params['equipment']
    if equipment_from_params
      @equipment = Equipment.find(equipment_from_params['id'])
      @avatar.equipments.each do |equipment|
        if equipment.type_name == @equipment.type_name
          equipment.avatar_id = nil
          equipment.save!
        end
      end
      @equipment.avatar_id = @avatar.id
      @equipment.save!
      # NOTE: Hacky
      @avatar = @equipment.avatar
    end
    @avatar.save!
    render :show
  end

  private
  def task_params
    params.require(:task).permit(:money_reward, task_type: [:type_name], equipment: [:id])
  end
end
