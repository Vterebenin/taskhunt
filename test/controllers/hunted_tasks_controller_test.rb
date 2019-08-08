require 'test_helper'

class HuntedTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hunted_task = hunted_tasks(:one)
  end

  test "should get index" do
    get hunted_tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_hunted_task_url
    assert_response :success
  end

  test "should create hunted_task" do
    assert_difference('HuntedTask.count') do
      post hunted_tasks_url, params: { hunted_task: { TaskDesc: @hunted_task.TaskDesc, TaskId: @hunted_task.TaskId, TaskTitle: @hunted_task.TaskTitle, isHunted: @hunted_task.isHunted } }
    end

    assert_redirected_to hunted_task_url(HuntedTask.last)
  end

  test "should show hunted_task" do
    get hunted_task_url(@hunted_task)
    assert_response :success
  end

  test "should get edit" do
    get edit_hunted_task_url(@hunted_task)
    assert_response :success
  end

  test "should update hunted_task" do
    patch hunted_task_url(@hunted_task), params: { hunted_task: { TaskDesc: @hunted_task.TaskDesc, TaskId: @hunted_task.TaskId, TaskTitle: @hunted_task.TaskTitle, isHunted: @hunted_task.isHunted } }
    assert_redirected_to hunted_task_url(@hunted_task)
  end

  test "should destroy hunted_task" do
    assert_difference('HuntedTask.count', -1) do
      delete hunted_task_url(@hunted_task)
    end

    assert_redirected_to hunted_tasks_url
  end
end
