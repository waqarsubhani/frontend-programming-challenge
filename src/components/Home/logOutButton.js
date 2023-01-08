import React from "react";
import { LocalService } from "../../utils/LocalStorage";

function LogOutButton({redirect}) {
    const onLogOut = () => {
        LocalService.removeData("jwt");
        redirect("/login")
    }
    return (
        <button 
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white 
            border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={onLogOut}
        >
            Log Out
        </button>
  );
}

export default LogOutButton;