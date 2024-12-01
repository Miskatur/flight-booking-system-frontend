import { Plane } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const SingleResult = ({ flight }) => {
  return (
    <div className="border p-2 lg:p-5 bg-white rounded-lg grid lg:grid-cols-12 gap-3 items-center hover:shadow-lg">
      <div className="flex justify-center lg:justify-start items-center lg:col-span-2">
        <Plane size={64} strokeWidth={1} />
      </div>
      <div className=" lg:col-span-3 flex flex-col justify-center lg:items-start items-center">
        <h3 className="text-xl font-semibold">
          {flight?.airline} -{" "}
          <span className="font-normal">({flight?.flight_number})</span>
        </h3>
        <p className="text-textColor text-sm">
          {flight?.origin} - {flight?.destination}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center lg:items-start lg:col-span-2">
        <p>
          Total Seats -{" "}
          <span className="font-semibold">{flight?.capacity}</span>
        </p>
        <p>
          Available Seats -{" "}
          <span className="font-semibold">{flight?.remaining_seat}</span>
        </p>
      </div>
      <div className=" lg:col-span-3 flex flex-col justify-center items-center ">
        <p>Departure Date & Time - </p>
        <p>
          <span className="font-semibold">
            {" "}
            {moment(flight?.date).format("MMM Do, YYYY")} at {flight?.time}
          </span>
        </p>
      </div>

      <div className="flex flex-col  items-center  lg:col-span-2">
        <h2 className="text-2xl font-bold">{flight?.price}TK</h2>
        <Link
          to={`/flight/${flight?.id}`}
          className="w-full  md:w-1/2 md:mx-auto lg:w-full"
        >
          <button className="bg-primary text-white font-semibold py-1 px-6 rounded-lg w-full">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleResult;
