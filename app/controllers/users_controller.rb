class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.username == "Guest" && @user.is_password?("n3k8c0sap19")
      User.find_by(username: "Guest").try(:destroy)
    end

    if @user.save
      @user.create_profile_items
      @user.create_tutorial_tasks
      @user.create__equipment_rewards

      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def update
    @user = current_user
    @user.update(tutorial: true)
    render json: @user
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
