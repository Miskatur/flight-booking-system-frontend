import React, { useState } from "react";
import DashboardHeader from "../../utils/dashboardHeader";
import InputField from "../../utils/inputField";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hook/useCurrentuser";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../redux/features/user-slice";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { token } = useCurrentUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New Password are not same");
      return;
    }
    const form = e.target;
    const payload = {
      oldPassword: form.oldPassword.value,
      newPassword: form.newPassword.value,
    };
    try {
      const res = await changePassword({
        token,
        payload,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        form.reset();
        navigate("/user/profile");
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };

  const handleCancel = () => {
    router.push("/user/profile");
  };
  return (
    <div className="max-w-7xl mx-auto py-6 px-2 lg:px-0 min-h-[90vh]">
      <DashboardHeader
        text="Change Password"
        classes="text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 mt-10 p-5 border shadow rounded-lg bg-white"
      >
        <div className="w-full ">
          <InputField
            label="Old Password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Type your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            classes="w-full "
            type="password"
            autocomplete="current-password"
          />
        </div>
        <div className=" relative">
          <InputField
            label="New Password"
            name="newPassword"
            id="newPassword"
            placeholder="Type your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            classes="w-full"
            type={isPasswordVisible ? "text" : "password"}
            autocomplete="new-password"
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-2 bottom-2.5"
          >
            {isPasswordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <div className="w-full">
          <InputField
            label="Confirm New Password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classes="w-full"
            type="password"
            autocomplete="new-password"
          />
        </div>

        <div className="flex space-x-2 items-center mt-5">
          <button
            disabled={
              isLoading || !newPassword || !confirmPassword || !oldPassword
                ? true
                : false
            }
            type="submit"
            className="py-2 bg-primary text-white px-6 text-lg font-medium rounded border border-primary"
          >
            {isLoading ? "Wait a moment" : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-2 rounded border hover:bg-gray-100 text-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
