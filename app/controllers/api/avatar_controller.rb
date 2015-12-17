class Api::AvatarController < ApplicationController
  def index
    if signed_in?
      @avatar = current_user.avatar
      render json: @avatar
    end
  end
end
