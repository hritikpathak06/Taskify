import axios from "axios";
import { PenIcon, Trash2Icon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../config/url";
import { useState } from "react";
import Modal from "../shared/Modal";
import UpdateTask from "./UpdateTask";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskTable = ({ tasks, setTasks }: any) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const navigate = useNavigate();

  const { userData } = useSelector((state: any) => state.auth);

  const deleteTask = async (taskId: any) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/task/single-task/${taskId}`,
        { withCredentials: true }
      );
      toast.success(data.msg);
      setTasks((prevTasks: any[]) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  const handleEdit = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmation = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    if (selectedTaskId) {
      deleteTask(selectedTaskId);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <table className="w-full table-auto border-separate border-spacing-y-3 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">
              Title
            </th>
            <th className="px-6 py-3 text-left text-gray-700 font-semibold">
              Due Date
            </th>
            <th className="px-6 py-3 text-gray-700 font-semibold text-center">
              Priority
            </th>
            <th className="px-6 py-3 text-center text-gray-700 font-semibold">
              Status
            </th>
            <th className="px-6 py-3 text-center text-gray-700 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr
              key={task._id}
              className="bg-white border-b hover:bg-gray-50 transition-colors"
            >
              <td
                className="px-6 py-4 cursor-pointer underline"
                onClick={() => navigate(`/dashboard/task/${task._id}`)}
              >
                {task.title}
              </td>
              <td className="px-6 py-4">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>

              <td className="px-4 py-2 text-center">
                <span
                  className={`inline-block px-6 py-2 text-xs font-semibold rounded-full ${
                    task.priority === "Low"
                      ? "bg-green-200 text-green-800"
                      : task.priority === "Medium"
                      ? "bg-blue-300 text-blue-800"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {task.priority}
                </span>
              </td>

              <td className="px-4 py-4 text-center">
                <span
                  className={`inline-block px-6 py-2 text-xs font-semibold rounded-full ${
                    task.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {task.status}
                </span>
              </td>

              {userData._id === task.createdBy ? (
                <td className="px-6 py-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-colors"
                  >
                    <PenIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(task._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-colors"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </button>
                </td>
              ) : (
                <td className="px-6 py-4 text-center flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-gray-500" />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update The Task"
      >
        {selectedTaskId && (
          <UpdateTask
            tasks={tasks}
            setTasks={setTasks}
            taskId={selectedTaskId}
            isModalOpen={setIsModalOpen}
          />
        )}
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Task"
      >
        <div className="p-4 text-center">
          <p>Are you sure you want to delete this task?</p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskTable;
