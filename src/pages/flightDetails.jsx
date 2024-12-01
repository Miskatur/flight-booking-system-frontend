import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCurrentUser from "../hook/useCurrentuser";
import { useGetAFlightInfoQuery } from "../redux/features/flights-slice";
import Spinner from "../shared/loader";
import Breadcrumbs from "../utils/breadcrumbs";
import DashboardHeader from "../utils/dashboardHeader";
import moment from "moment";
import InputField from "../utils/inputField";
import { useAddABookingMutation } from "../redux/features/bookings-slice";
import { toast } from "sonner";
import InfoText from "../utils/infoText";

const FlightDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, name, email } = useCurrentUser();
  const { data, isLoading } = useGetAFlightInfoQuery({
    id,
  });
  const [addABooking, { isLoading: addBookingLoading }] =
    useAddABookingMutation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [address, setAddress] = useState("");
  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );
  }
  const handleSeatClick = (seat) => {
    if (seat.status === "BOOKED") return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const handleBooking = async () => {
    if (!selectedSeats.length) {
      toast.error("Please select at least one seat.");
      return;
    }
    if (!address) {
      toast.error("Please provide your present address.");
    }
    const payload = {
      flight_info: data?.data?._id,
      seats: selectedSeats,
      address: address,
    };
    try {
      const res = await addABooking({ token, payload });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setSelectedSeats([]);
        navigate("/user/my-bookings");
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };

  const filteredDate = new Date(data?.data?.date).toISOString().split("T")[0];

  const handleCancel = () => {
    navigate(
      `/search?origin=${data?.data?.origin}&destination=${data?.data?.destination}&date=${filteredDate}`
    );
  };
  return (
    <div className="max-w-7xl mx-auto py-6 px-2">
      <div className="my-3">
        <Breadcrumbs
          currentPath={`${data?.data?.airline} - ${data?.data?.flight_number}`}
          primaryText="Results"
          primaryLink={`/search?origin=${data?.data?.origin}&destination=${data?.data?.destination}&date=${filteredDate}`}
        />
      </div>
      <div>
        <DashboardHeader
          text={`Flight Information`}
          classes={
            "text-2xl md:text-4xl font-semibold bg-white p-2 lg:p-4 text-primary rounded"
          }
        />
      </div>
      <div className="grid lg:grid-cols-2 w-full lg:w-2/3 p-2">
        <div className="my-5">
          <InfoText
            label={"Flight Name"}
            value={data?.data?.airline}
            classes="text-xl text-textColor"
          />
          <InfoText label={"Flight Number"} value={data?.data?.flight_number} />
          <InfoText label={"Flight From"} value={data?.data?.origin} />
          <InfoText label={"Flight To"} value={data?.data?.destination} />
          <InfoText label={"Price Per Seat"} value={`${data?.data?.price}TK`} />
        </div>
        <div className="my-5">
          <InfoText
            label={"Flight Departure Date"}
            value={moment(data?.data?.date).format("MMM Do, YYYY")}
          />
          <InfoText
            label={"Flight Departure Time"}
            value={`${data?.data?.time} (24h Format)`}
          />
          <InfoText
            label={"Total Seat"}
            value={`${data?.data?.capacity} seats`}
          />
          <InfoText
            label={"Available Seat"}
            value={`${data?.data?.remaining_seat} seats`}
          />
        </div>
      </div>

      <div className="grid lg:w-1/2 w-full bg-white rounded-lg p-2 lg:p-4">
        <h3 className="text-2xl font-semibold mt-4">Book Your Seat</h3>
        <hr className="my-4" />
        <div className="grid gap-6">
          {Array.from({
            length: Math.ceil(data?.data?.available_seats?.seats.length / 6),
          }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-7 gap-2 md:gap-4 lg:gap-5 items-center"
            >
              {/* Left Section (3 Seats) */}
              {data?.data?.available_seats?.seats
                .slice(rowIndex * 6, rowIndex * 6 + 3)
                .map((seat) => (
                  <button
                    key={seat._id}
                    className={`p-2 md:p-4 border rounded text-center ${
                      seat.status === "BOOKED"
                        ? "bg-red-500 text-white"
                        : selectedSeats.includes(seat.seatNumber)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "BOOKED"}
                  >
                    {seat.seatNumber}
                  </button>
                ))}

              {/* Aisle (Empty Space) */}
              <div className=""></div>

              {/* Right Section (3 Seats) */}
              {data?.data?.available_seats?.seats
                .slice(rowIndex * 6 + 3, rowIndex * 6 + 6)
                .map((seat) => (
                  <button
                    key={seat._id}
                    className={`p-2 md:p-4 border rounded text-center ${
                      seat.status === "BOOKED"
                        ? "bg-red-500 text-white"
                        : selectedSeats.includes(seat.seatNumber)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.status === "BOOKED"}
                  >
                    {seat.seatNumber}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>

      <hr className="my-3" />

      <div className="mt-5">
        <h5 className="text-lg font-semibold ">Personal Details</h5>
        <div className="w-full md:w-1/2 bg-white p-2">
          <InfoText label={"Name"} value={name} />
          <InfoText label={"Email"} value={email} />
          <div className="w-full mt-2">
            <InputField
              label="Present Address"
              name="address"
              id="address"
              placeholder="Type your Present Address here"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              classes="w-full "
              type="text"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-2 items-center mt-5">
        <button
          className=" px-6 py-2 bg-blue-500 text-white rounded"
          onClick={handleBooking}
          disabled={addBookingLoading}
        >
          Confirm Booking
        </button>
        <button
          onClick={handleCancel}
          type="button"
          className="px-4 py-2 rounded border hover:bg-gray-100 text-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;
