import React from "react";
import Sidebar from "../shared/Sidebar";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../config/url";
import { LogsIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/logout`, {
        withCredentials: true,
      });
      toast.success(data.msg || "Logged out successfully");
      window.location.href = "/";
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.msg || "Failed to log out. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="left w-1/6 md:w-[8%] lg:w-1/6 xl:w-[14%] p-0 border-l-2">
        <div className="flex items-center justify-center pt-4">
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center justify-center p-4 bg-black rounded-md text-white w-4/5"
          >
            Logout
          </button>

  
          <div className="flex md:hidden items-center justify-center p-4 bg-black rounded-md text-white w-4/5">
            <LogsIcon className=" h-6 w-6 cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
        <Sidebar />
      </div>

      <div className="right w-5/6 md:w-[92%] lg:w-5/6 xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
        {children}
      </div>
    </div>
  );
}
