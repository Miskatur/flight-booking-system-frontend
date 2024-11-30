import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../hook/useCurrentuser";

const Header = () => {
  const { role } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <div className="bg-blue-300 ">
      <div className="flex justify-between items-center py-2 max-w-7xl mx-auto px-2 md:px-0">
        <Link to="/">
          <h3 className="text-3xl font-bold">Logo</h3>
        </Link>
        {role ? (
          <button
            className=" rounded-md bg-sky-600 px-6 py-1.5 text-white transition-colors font-medium "
            onClick={handleLogout}
          >
            Signout
          </button>
        ) : (
          <Link
            to={"/signin"}
            className=" rounded-md bg-sky-600 px-6 py-1.5 text-white transition-colors font-medium "
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
