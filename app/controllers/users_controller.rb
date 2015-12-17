class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)

      TaskType.create(user_id: @user.id, type_name: "Habits")
      TaskType.create(user_id: @user.id, type_name: "Dailies")
      TaskType.create(user_id: @user.id, type_name: "To-dos")
      Avatar.create(user_id: @user.id)

      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
