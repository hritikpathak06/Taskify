import { useEffect, useState } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import { BASE_URL } from "../../config/url";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CheckCheckIcon,
  Clock10Icon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";

const SingleTask = () => {
  const [task, setTask] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/task/single-task/${id}`,
        { withCredentials: true }
      );
      setTask(data.task);
    })();
  }, [id]);

  if (!task) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  console.log("task", task);

  return (
    <DashboardLayout>
      <div className=" min-h-screen h-max   mx-auto p-8 flex flex-col items-center justify-center gap-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {task.title}
          </h1>
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              <strong>Status:</strong>{" "}
              <span
                className={`px-4 py-2 rounded-full ${
                  task.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.status === "Pending" ? (
                  <Clock10Icon className="h-4 w-4 inline-block mr-1" />
                ) : (
                  <CheckCheckIcon className="h-4 w-4 inline-block mr-1" />
                )}
                {task.status}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Priority:</strong>{" "}
              <span
                className={`px-4 py-2 rounded-full ${
                  task.priority === "High"
                    ? "bg-red-500 text-white"
                    : task.priority === "Medium"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700">{task.description}</p>
        </div>

        <div className="mb-8 flex items-center">
          <CalendarIcon className="h-6 w-6 text-gray-600 mr-4" />
          <span className="text-lg text-gray-600">
            <strong>Due Date:</strong>{" "}
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </span>
        </div>

        <div className="mb-3 flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-700">Assigned To</p>
            <p className="text-lg text-gray-600">{task.assignedTo?.name}</p>
            <p className="text-sm text-gray-600">{task.assignedTo?.email}</p>
          </div>
        </div>

        <div className="mb-8 flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-gray-600" />
          <div>
            <p className="font-semibold text-gray-700">Created By</p>
            <p className="text-lg text-gray-600">{task.createdBy?.name}</p>
            <p className="text-sm text-gray-600">{task.createdBy?.email}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SingleTask;
