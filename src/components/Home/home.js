import React from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./logOutButton";

function Home() {
    const navigate = useNavigate();

    const redirect = (route) => {
        navigate(route, { replace: true });
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">My App</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow"></div>
                <div>
                    <LogOutButton redirect={redirect} />
                </div>
            </div>
        </nav>
  );
}

export default Home;