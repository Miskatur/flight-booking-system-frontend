import React from "react";
import { useOverviewQuery } from "../../redux/features/overview-slice";
import useCurrentUser from "../../hook/useCurrentuser";
import Spinner from "../../shared/loader";
import {
  CalendarDays,
  ChartNoAxesCombined,
  CircleCheckBig,
  CircleX,
  Combine,
  Layers3,
  Package,
  Plane,
  PlaneTakeoff,
  TicketsPlane,
  Users,
} from "lucide-react";
import DashboardHeader from "../../utils/dashboardHeader";

const Overview = () => {
  const { token } = useCurrentUser();
  const { data, isLoading } = useOverviewQuery({ token });
  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );
  }
  const overviewData = [
    {
      name: "Total Users",
      icon: <Users size={40} />,
      value: data?.data?.usersCount,
    },
    {
      name: "Total Flights",
      icon: <Plane size={40} />,
      value: data?.data?.flightsCount,
    },
    {
      name: "Available Flights",
      icon: <PlaneTakeoff size={40} />,
      value: data?.data?.availableFlight,
    },
    {
      name: "Total Bookings",
      icon: <TicketsPlane size={40} />,
      value: data?.data?.bookingsCount,
    },
    {
      name: "Confirmed Bookings",
      icon: <CircleCheckBig size={40} />,
      value: data?.data?.confirmedBookingsCount,
    },
    {
      name: "Cancel Bookings",
      icon: <CircleX size={40} />,
      value: data?.data?.cancelBookingsCount,
    },
  ];
  return (
    <div>
      <DashboardHeader
        text="Dashboard Overview"
        classes="text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        {overviewData?.map((overview, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-10 bg-primary text-white rounded-lg space-y-5"
            >
              <span>{overview.icon}</span>
              <span className="text-2xl">{overview.name}</span>
              <p className="text-4xl mt-3">{overview.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
