/* eslint-disable react/prop-types */
import {
  House,
  Power,
  Tags,
  User,
  UserCog,
  UserRoundPenIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AvatarDropdown = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const items = [
    {
      name: "My Bookings",
      icon: <House size={20} />,
      url: "/user/my-bookings",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      url: "/user/profile",
    },
    {
      name: "Change Password",
      icon: <UserCog size={20} />,
      url: "/user/edit/password",
    },
  ];

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div
      ref={dropDownRef}
      className="relative mx-auto w-fit text-white ml-4 md:ml-6 "
    >
      <button onClick={() => setOpen((prev) => !prev)}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-lg ">
          {name?.charAt(0).toUpperCase()}
        </div>
      </button>
      <ul
        className={`${
          open ? "visible duration-300" : "invisible"
        } absolute right-0 top-13 z-[9999] w-56 rounded bg-white  border border-gray-200`}
      >
        {items.map((item, idx) => (
          <li key={idx}>
            <Link
              to={`${item?.url}`}
              className={`rounded-sm px-6 py-3  cursor-pointer flex gap-x-4 items-center ${
                open ? "opacity-100 duration-300" : "opacity-0"
              } ${
                item.name === "Log Out"
                  ? "text-red-500 hover:bg-red-600 hover:text-white"
                  : "hover:bg-slate-200 text-textColor"
              }`}
            >
              <p
                className={` ${
                  item.name === "Log Out"
                    ? " hover:text-white"
                    : " text-textColor"
                }`}
              >
                {item.icon}
              </p>

              <p className="w-fit"> {item.name}</p>
            </Link>
          </li>
        ))}
        <li
          onClick={handleLogout}
          className={`text-red-500 hover:bg-red-600 hover:text-white px-6 py-3 flex gap-x-4 items-center cursor-pointer`}
        >
          <p>
            <Power size={20} />
          </p>

          <p className="w-fit">Log Out</p>
        </li>
      </ul>
    </div>
  );
};

export default AvatarDropdown;
