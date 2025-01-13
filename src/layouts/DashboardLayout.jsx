import React,{Suspense,lazy} from "react";
const Sidebar = lazy(()=>import('../components/Sidebar'));
const Header = lazy(()=>import('../components/Header'));
import { Outlet } from "react-router-dom";
import LazyLoader from "../utils/LazyLoader";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Suspense fallback={<LazyLoader/>}>
        <Header />
      </Suspense>

      <div className="flex flex-1 mt-16 overflow-hidden">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-4 overflow-auto scrollbar scrollbar-thumb-indigo-300 scrollbar-track-transparent">
          <Suspense fallback={<LazyLoader/>}>
            <Outlet/>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
