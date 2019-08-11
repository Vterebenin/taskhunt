class HuntedTasksController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_hunted_task, only: [:show, :edit, :update, :destroy]

  # GET /hunted_tasks
  # GET /hunted_tasks.json
  def index
    @hunted_tasks = HuntedTask.all
  end

  # GET /hunted_tasks/1
  # GET /hunted_tasks/1.json
  def show
  end

  # GET /hunted_tasks/new
  def new
    @hunted_task = HuntedTask.new
  end

  # GET /hunted_tasks/1/edit
  def edit
  end

  # POST /hunted_tasks
  # POST /hunted_tasks.json
  def create
    @hunted_task = HuntedTask.new(hunted_task_params)

    respond_to do |format|
      if @hunted_task.save
        format.html { redirect_to @hunted_task, notice: 'Hunted task was successfully created.' }
        format.json { render :show, status: :created, location: @hunted_task }
      else
        format.html { render :new }
        format.json { render json: @hunted_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /hunted_tasks/1
  # PATCH/PUT /hunted_tasks/1.json
  def update
    respond_to do |format|
      if @hunted_task.update(hunted_task_params)
        format.html { redirect_to @hunted_task, notice: 'Hunted task was successfully updated.' }
        format.json { render :show, status: :ok, location: @hunted_task }
      else
        format.html { render :edit }
        format.json { render json: @hunted_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hunted_tasks/1
  # DELETE /hunted_tasks/1.json
  def destroy
    @hunted_task.destroy
    respond_to do |format|
      format.html { redirect_to hunted_tasks_url, notice: 'Hunted task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hunted_task
      @hunted_task = HuntedTask.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hunted_task_params
      params.require(:hunted_task).permit(:isHunted,:TaskTitle,:TaskDesc,:author,:deadline,:priority,:status,:project,:estimated_hours,:TaskId)
    end
end       
