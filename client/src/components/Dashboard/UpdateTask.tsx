import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/url";
import toast from "react-hot-toast";

const UpdateTask = ({ setTasks, isModalOpen, taskId }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignedTo: "",
  });

  const [users, setUsers] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any>(null);

  useEffect(() => {
    if (taskId) {
      (async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/task/single-task/${taskId}`,
          { withCredentials: true }
        );
        setCurrentTask(data.task);

        setFormData({
          title: data.task.title,
          description: data.task.description,
          dueDate: data.task.dueDate.slice(0, 10),
          priority: data.task.priority,
          status: data.task.status,
          assignedTo: "",
        });
      })();
    }
  }, [taskId]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASE_URL}/api/v1/users`, {
        withCredentials: true,
      });
      setUsers(data.users);
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData==>> ", formData);

    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/task/single-task/${taskId}`,
        formData,
        { withCredentials: true }
      );
      toast.success(data.msg);
      setTasks((prevTasks: any[]) =>
        prevTasks.map((task) => (task._id === taskId ? data.task : task))
      );
      isModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      {currentTask ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Task
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                required
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assign Task
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a user</option>
                  {users.map((u, i) => (
                    <option key={i} value={u._id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-md"
                onClick={() => isModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md"
              >
                Update Task
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div>Loading task details...</div>
      )}
    </div>
  );
};

export default UpdateTask;
