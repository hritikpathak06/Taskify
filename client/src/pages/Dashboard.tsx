import { ArrowLeft, ArrowRight, PlusIcon } from "lucide-react";
import TaskTable from "../components/Dashboard/Table";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllTasks } from "../config/api";
import Modal from "../components/shared/Modal";
import CreateTask from "../components/Dashboard/CreateTask";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState<any>();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get("page") || "1";
  const page = Number(pageParam);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getAllTasks(page);
      setTasks(tasksData.tasks);
      setTotalPages(tasksData.pagination.totalPages);
    };

    fetchTasks();
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  return (
    <>
      <DashboardLayout>
        <div className="p-4 max-h[90vh] overflow-scroll h-[90vh]">
          <div className="flex items-center justify-between p-5 flex-col sm:flex-row">
            <h1 className="text-3xl font-extrabold text-center sm:text-left mb-4 sm:mb-0">
              Task List
            </h1>
            <button
              className="bg-black text-white p-3 flex items-center gap-2 justify-center rounded-md w-full sm:w-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon className="h-4 w-4" />
              Create Task
            </button>
          </div>

          <div>
            <TaskTable tasks={tasks} setTasks={setTasks} />
          </div>
        </div>

        <div className="flex gap-5 items-center p-2 ml-2">
          <ArrowLeft
            className="h-6 w-6 cursor-pointer"
            onClick={() => page > 1 && handlePageChange(page - 1)}
          />
          <h1>
            {page} out of {totalPages}
          </h1>
          <ArrowRight
            className="h-6 w-6 cursor-pointer"
            onClick={() => page < totalPages && handlePageChange(page + 1)}
          />
        </div>
      </DashboardLayout>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Task"
      >
        <CreateTask
          tasks={tasks}
          setTasks={setTasks}
          isModalOpen={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
