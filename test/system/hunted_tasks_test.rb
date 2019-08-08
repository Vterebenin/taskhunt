require "application_system_test_case"

class HuntedTasksTest < ApplicationSystemTestCase
  setup do
    @hunted_task = hunted_tasks(:one)
  end

  test "visiting the index" do
    visit hunted_tasks_url
    assert_selector "h1", text: "Hunted Tasks"
  end

  test "creating a Hunted task" do
    visit hunted_tasks_url
    click_on "New Hunted Task"

    fill_in "Taskdesc", with: @hunted_task.TaskDesc
    fill_in "Taskid", with: @hunted_task.TaskId
    fill_in "Tasktitle", with: @hunted_task.TaskTitle
    check "Ishunted" if @hunted_task.isHunted
    click_on "Create Hunted task"

    assert_text "Hunted task was successfully created"
    click_on "Back"
  end

  test "updating a Hunted task" do
    visit hunted_tasks_url
    click_on "Edit", match: :first

    fill_in "Taskdesc", with: @hunted_task.TaskDesc
    fill_in "Taskid", with: @hunted_task.TaskId
    fill_in "Tasktitle", with: @hunted_task.TaskTitle
    check "Ishunted" if @hunted_task.isHunted
    click_on "Update Hunted task"

    assert_text "Hunted task was successfully updated"
    click_on "Back"
  end

  test "destroying a Hunted task" do
    visit hunted_tasks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Hunted task was successfully destroyed"
  end
end
