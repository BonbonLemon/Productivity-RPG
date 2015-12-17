class Api::TasksController < ApplicationController
  def index
    # if params[:task_type_id]:
    tasks = Task.all
    render json: tasks
  end

  def show
    @task = Task.find(params[:id])
    render :show
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
    @task = Task.find(params[:id])
    @task.destroy!
    render :show
  end

  private
  def task_params
    params.require(:task).permit(:title, :money_reward, :type_id)
  end
end
