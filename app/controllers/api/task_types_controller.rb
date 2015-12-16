class Api::TaskTypesController < ApplicationController
  def index
    if signed_in?
      @task_types = current_user.task_types
    end
    render :index
  end

  def show
    task_type = TaskType.find(params[:id])
    render json: task_type
  end

  def create
    task_type = TaskType.create!(task_typeparams)
    render json: task_type
  end

  def update
    task_type = TaskType.find(params[:id])
    taskType.update!(task_typeparams)
    render json: task_type
  end

  def destroy
    task_type = TaskType.find(params[:id])
    task_type = destroy!
    render json: TaskType.all
  end

  private
  def task_type_params
    params.require(:task).permit(:title, :money_reward)
  end
end
