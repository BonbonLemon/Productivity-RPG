class Api::AvatarController < ApplicationController
  def index
    @avatar = current_user.avatar
    render :show
  end

  def show
    @avatar = current_user.avatar
    debugger
  end

  def update
    @avatar = current_user.avatar
    reward_money = task_params['money_reward'].to_i
    if task_params['task_type']['type_name'] == "Rewards" ||
       task_params['task_type']['type_name'] == "Items"
      current_money = @avatar.money - reward_money
    else
      current_money = @avatar.money + reward_money
    end
    @avatar.update(money: current_money)

    equipment_from_params = task_params['equipment']
    if equipment_from_params
      @equipment = Equipment.find(equipment_from_params['id'])
      @avatar.equipments.each do |equipment|
        if equipment.type_name == @equipment.type_name
          equipment.update!(avatar_id: nil)
        end
      end
      @equipment.update!(avatar_id: @avatar.id)
      # NOTE: Hacky
      @avatar = @equipment.avatar
    end
    render :show
  end

  private
  def task_params
    params.require(:task).permit(:money_reward, task_type: [:type_name], equipment: [:id])
  end
end
