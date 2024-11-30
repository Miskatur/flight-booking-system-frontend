import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../hook/useCurrentuser";
import AvatarDropdown from "../utils/avatarDropdown";

const Header = () => {
  const { role, name } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };
  return (
    <div className="bg-blue-200 ">
      <div className="flex justify-between items-center py-2 max-w-7xl mx-auto px-2 md:px-0">
        <Link to="/">
          <h3 className="text-3xl font-bold text-primary">Logo</h3>
        </Link>
        {role ? (
          <div>
            {role === "ADMIN" && (
              <div className="flex items-center space-x-2">
                <Link
                  to={"/admin/dashboard"}
                  className=" rounded-md bg-primary px-3 md:px-6 py-1.5 text-white transition-colors font-medium "
                >
                  Dashboard
                </Link>
                <button
                  className=" rounded-md bg-primary px-3 md:px-6 py-1.5 text-white transition-colors font-medium"
                  onClick={handleLogout}
                >
                  Signout
                </button>
              </div>
            )}
            {role === "USER" && <AvatarDropdown name={name} />}
          </div>
        ) : (
          <Link
            to={"/signin"}
            className=" rounded-md bg-primary px-6 py-1.5 text-white transition-colors font-medium "
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
