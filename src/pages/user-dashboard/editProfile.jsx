import React, { useEffect, useState } from "react";
import InputField from "../../utils/inputField";
import useCurrentUser from "../../hook/useCurrentuser";
import { useUpdateProfileMutation } from "../../redux/features/user-slice";
import DashboardHeader from "../../utils/dashboardHeader";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { name, email, phone, token, updateUserData } = useCurrentUser();
  const [fullName, setFullName] = useState(name);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const navigate = useNavigate();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  useEffect(() => {
    setFullName(name);
    setPhoneNumber(phone);
  }, [name, phone]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const payload = {
      name: fullName,
      phone: phoneNumber,
    };

    try {
      const res = await updateProfile({
        token,
        payload,
      });
      if (res?.data?.success) {
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        toast.success(res?.data?.message);
        updateUserData();
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
    <div className="max-w-7xl mx-auto py-6 px-2 lg:px-0">
      <DashboardHeader
        text="Update Profile"
        classes="text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
      />
      <form
        onSubmit={handleUpdateProfile}
        className="w-full md:w-1/2 bg-white p-2 mt-10"
      >
        <div className="w-full mt-2">
          <InputField
            label="Your Full Name"
            name="fullName"
            id="fullName"
            placeholder="Type your full name here"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            classes="w-full "
            type="text"
            required={true}
          />
        </div>
        <div className="w-full mt-2">
          <InputField
            label="Your Email Address (Can not be changed)"
            name="email"
            id="email"
            placeholder="Type your Email Address here"
            value={email}
            onChange={(e) => e.target.value}
            classes="w-full cursor-not-allowed"
            type="email"
            readOnly={true}
            disabled={true}
          />
        </div>
        <div className="w-full mt-2">
          <InputField
            label="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Type your phone number here"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            classes="w-full "
            type="tel"
          />
        </div>
        <div className="flex space-x-2 items-center mt-5">
          <button
            disabled={isLoading || !fullName || !phoneNumber ? true : false}
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

export default EditProfile;
