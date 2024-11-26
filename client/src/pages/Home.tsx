import  { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Home = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleShow = () => {
    setShowLogin(!showLogin);
  };
  return (
    <div>
      {showLogin ? (
        <Login handleShow={handleShow} />
      ) : (
        <Register handleShow={handleShow} />
      )}
    </div>
  );
};

export default Home;
