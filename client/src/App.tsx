import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import MyTasks from "./pages/Tasks";
import SingleTask from "./components/Dashboard/SingleTask";

const App = () => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
      />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/tasks"
        element={isAuthenticated ? <MyTasks /> : <Navigate to="/" />}
      />

      <Route
        path="/dashboard/task/:id"
        element={isAuthenticated ? <SingleTask /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
