class Api::AvatarController < ApplicationController
  def index
    @avatar = current_user.avatar
    render :show
  end

  def show
    @avatar = Avatar.find(params[:id])
  end

  def update
    @avatar = current_user.avatar
    reward_money = task_params['money_reward'].to_i
    if task_params['task_type']['type_name'] == "Rewards"
      @avatar.money -= reward_money
    else
      @avatar.money += reward_money
    end
    @avatar.save!
    render json: @avatar
  end

  private
  def task_params
    params.require(:task).permit(:money_reward, task_type: [:type_name])
  end
end
