import React from 'react'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { LuTrash2 } from 'react-icons/lu'
import { PRIORITY_DATA } from '../../utils/data'
import SelectDropdown from '../../components/Inputs/SelectDropdown'


const CreateTask = () => {

  const location = useLocation()
  const { taskId } = location.state || {};
  const navigate = useNavigate()

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value, }))
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => { };

  // Update Task
  const updateTask = async () => { };


  const handleSubmit = async () => { };

  // Get task details by id
  const getTaskDetailsById = async () => { };

  // Delete Task
  const deleteTask = async () => { };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-sapn-3">
            <div className="flex items-center justify-between ">
              <h2 className='text-xl md:text-xl font-medium'>
                {taskId ? `Update Task` : `Create New Task`}
              </h2>
              {taskId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base' /> Delete
                </button>
              )}
            </div>
            <div className=" mt-4">
              <label className='text-xs font-medium text-slate-600'>
                Task Title
              </label>
              <input
                placeholder='Create App UI'
                type="text"
                value={taskData.title}
                onChange={({ target }) => handleValueChange("title", target.value)}
                className='form-input '
              />
            </div>

            <div className="mt-3">
              <label className='text-xs font-medium text-slate-600'>
                Description
              </label>
              <textarea
                placeholder='Description Task'
                className='form-input'
                rows={4}
                value={taskData.description}
                onChange={({ target }) => handleValueChange("description", target.value)}
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-end-4">
                <label className='text-xs font-medium text-slate-600'>
                  Priority
                </label>
                <SelectDropdown
                  option={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreateTask