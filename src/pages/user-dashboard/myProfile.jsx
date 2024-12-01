import React from "react";
import useCurrentUser from "../../hook/useCurrentuser";
import Breadcrumbs from "../../utils/breadcrumbs";
import DashboardHeader from "../../utils/dashboardHeader";
import InfoText from "../../utils/infoText";
import { Link } from "react-router-dom";
import Spinner from "../../shared/loader";

const MyProfile = () => {
  const { name, email, phone, loading } = useCurrentUser();
  if (loading) {
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto py-6 px-2 lg:px-0 min-h-[80vh]">
      <div className="my-3">
        <Breadcrumbs
          currentPath={`My Profile`}
          primaryText="Home"
          primaryLink={`/`}
        />
      </div>
      <DashboardHeader
        text={`Hello, ${name}!`}
        classes={
          "text-2xl md:text-4xl font-semibold bg-white p-2 lg:p-4 text-primary rounded"
        }
      />
      <div className="my-5">
        <h5 className="text-lg font-semibold ">Personal Details</h5>
        <div className="w-full md:w-1/2 bg-white p-2">
          <InfoText label={"Name"} value={name} />
          <InfoText label={"Email"} value={email} />
          <InfoText label={"Phone"} value={phone} />
        </div>
        <div className="flex space-x-2 items-center mt-5">
          <Link to={"/user/edit/profile"}>
            {" "}
            <button className=" px-6 py-2 bg-blue-500 text-white rounded">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
