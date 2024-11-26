import { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import axios from "axios";
import { BASE_URL } from "../config/url";
import toast from "react-hot-toast";
import { CheckCheckIcon, Clock10Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const MyTasks = () => {
  const [columns, setColumns] = useState<any>({
    Pending: [],
    Completed: [],
  });

  const navigate = useNavigate();

  const [myTasks, setMyTasks] = useState<Task[]>([]);

  const onDragStart = (event: any, item: Task, fromColumn: string) => {
    event.dataTransfer.setData("item", JSON.stringify(item));
    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  const onDrop = (event: any, toColumn: string) => {
    const item = JSON.parse(event.dataTransfer.getData("item"));
    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (toColumn === fromColumn) return;

    setColumns((prev: any) => {
      const fromData = prev[fromColumn].filter(
        (task: Task) => task._id !== item._id
      );
      const toData = [...prev[toColumn], { ...item, status: toColumn }];
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData,
      };
    });

    (async () => {
      try {
        const { data } = await axios.put(
          `${BASE_URL}/api/v1/task/update-task/${item._id}`,
          { status: toColumn },
          { withCredentials: true }
        );
        toast.success(data.msg);
      } catch (error) {
        console.error("Failed to update task status:", error);
      }
    })();
  };

  const onDragOver = (e: any) => e.preventDefault();

  console.log(myTasks);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/v1/task/my-tasks`, {
          withCredentials: true,
        });

        const pendingTasks = data.tasks.filter(
          (task: Task) => task.status === "Pending"
        );
        const completedTasks = data.tasks.filter(
          (task: Task) => task.status === "Completed"
        );

        setColumns({
          Pending: pendingTasks,
          Completed: completedTasks,
        });

        setMyTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, []);

  return (
    <DashboardLayout>
      <div className=" pt-7">
        <h1 className=" text-3xl font-extrabold text-center">My Tasks</h1>
      </div>
      <div className="container  flex flex-col md:flex-row gap-4  p-4 w-full">
        {Object.keys(columns).map((column, index) => (
          <div
            className="column !w-full md:w-1/2 p-4 border rounded-lg bg-gray-50 mt-4 md:mt-12 shadow-lg transition-transform duration-300 ease-in-out"
            key={index}
            onDrop={(event) => onDrop(event, column)}
            onDragOver={onDragOver}
          >
            <h1 className="text-lg md:text-xl font-semibold mb-4 text-center text-gray-800">
              {column === "Pending" ? "🕒 Pending" : "✅ Completed"}
            </h1>
            <div className="space-y-4">
              {columns[column].map((item: Task) => (
                <div
                  key={item._id}
                  className="item p-4 bg-white border-l-4 border-blue-500 mb-4 rounded-lg shadow-md hover:shadow-xl cursor-pointer transform transition-transform"
                  onDragStart={(event) => onDragStart(event, item, column)}
                  draggable
                  onClick={() => navigate(`/dashboard/task/${item._id}`)}
                >
                  <h2 className="text-md font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3 break-words">
                    {item.description.substring(0, 50)}....
                  </p>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {item.status === "Pending" ? (
                        <Clock10Icon className="inline-block mr-1" />
                      ) : (
                        <CheckCheckIcon className="inline-block mr-1" />
                      )}
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
