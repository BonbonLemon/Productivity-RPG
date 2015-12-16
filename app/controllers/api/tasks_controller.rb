class Api::TasksController < ApplicationController
  def index
    # if params[:task_type_id]:
    tasks = current_user.task_types
    render json: tasks
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def create
    task = Task.create!(task_params)
    render json: task
  end

  def update
    task = Task.find(params[:id])
    task.update!(task_params)
    render json: task
  end

  def destroy
    task = Task.find(params[:id])
    task = destroy!
    render json: Task.all
  end

  private
  def task_params
    params.require(:task).permit(:title, :money_reward, :type_id)
  end
end
