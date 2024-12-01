import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCurrentUser from "../../../hook/useCurrentuser";
import DashboardHeader from "../../../utils/dashboardHeader";
import Breadcrumbs from "../../../utils/breadcrumbs";
import Spinner from "../../../shared/loader";
import {
  useGetAFlightInfoQuery,
  useUpdateAFlightMutation,
} from "../../../redux/features/flights-slice";
import InputField from "../../../utils/inputField";
import { toast } from "sonner";

const UpdateFlight = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useCurrentUser();
  const { data, isLoading } = useGetAFlightInfoQuery({
    id,
  });

  const [updateFlight, { isLoading: isUpdateLoading }] =
    useUpdateAFlightMutation();

  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [capacity, setCapacity] = useState(null);
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const handleTimeChange = (e) => {
    const inputValue = e.target.value;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (timeRegex.test(inputValue)) {
      setTime(inputValue);
    } else {
      toast.warning("Please enter a valid 24-hour time format.");
    }
  };
  useEffect(() => {
    if (data?.data) {
      setAirline(data?.data?.airline);
      setFlightNumber(data?.data?.flight_number);
      setOrigin(data?.data?.origin);
      setDestination(data?.data?.destination);
      setCapacity(data?.data?.capacity);
      setPrice(data?.data?.price);
      setDate(new Date(data?.data?.date).toISOString().split("T")[0]);
      setTime(data?.data?.time);
    }
  }, [data?.data]);

  const handleCancel = () => {
    navigate("/admin/dashboard/flights");
  };

  const handleUpdateFlight = async (e) => {
    e.preventDefault();
    if (
      !airline ||
      !flightNumber ||
      !origin ||
      !destination ||
      !date ||
      !time ||
      !capacity ||
      !price
    ) {
      toast.error("Please fill all the required fields");
    }
    const payload = {
      airline,
      flight_number: flightNumber,
      origin,
      destination,
      capacity,
      price,
      date,
      time,
    };
    try {
      const res = await updateFlight({ token, id: data?.data?.id, payload });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin/dashboard/flights");
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <DashboardHeader
        text={"Update Flight"}
        classes={
          "text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
        }
      />
      <div className="my-3">
        <Breadcrumbs
          currentPath={`${data?.data?.airline} - ${data?.data?.flight_number}`}
          primaryText="All Flights"
          primaryLink="/admin/dashboard/flights"
        />
      </div>
      <div className="my-5">
        <form
          onSubmit={handleUpdateFlight}
          className=" border p-2 rounded-lg shadow"
        >
          <section className="grid lg:grid-cols-2 items-center gap-3">
            <div className="w-full ">
              <InputField
                label="Airline Title"
                name="airline"
                id="airline"
                placeholder="Type your Airline Title"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                classes="w-full "
                type="text"
                required={true}
              />
            </div>
            <div className="w-full ">
              <InputField
                label="Flight Number"
                name="flightNumber"
                id="flightNumber"
                placeholder="Type Your flight number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                classes="w-full "
                type="text"
                required={true}
              />
            </div>
          </section>
          <section className="grid lg:grid-cols-2 items-center gap-3">
            <div className="w-full ">
              <InputField
                label="Flight Origin Address"
                name="origin"
                id="origin"
                placeholder="Ex: DHK"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                classes="w-full "
                type="text"
                required={true}
              />
            </div>
            <div className="w-full ">
              <InputField
                label="Flight Destination Address"
                name="destination"
                id="destination"
                placeholder="Ex: QAT"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                classes="w-full "
                type="text"
                required={true}
              />
            </div>
          </section>
          <section className="grid lg:grid-cols-2 items-center gap-3">
            <div className="w-full ">
              <InputField
                label="Flight Capacity"
                name="capacity"
                id="capacity"
                placeholder="Type your flight capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                classes="w-full "
                type="number"
                required={true}
              />
            </div>
            <div className="w-full ">
              <InputField
                label="Flight Per Seat Price (TK)"
                name="price"
                id="price"
                placeholder="Type your flight per seat price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                classes="w-full "
                type="number"
                required={true}
              />
            </div>
          </section>
          <section className="grid lg:grid-cols-2 items-center gap-3">
            <div className="w-full ">
              <InputField
                label="Flight Departure Date"
                name="date"
                id="date"
                placeholder="Type your flight departure date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                classes="w-full "
                type="date"
                required={true}
              />
            </div>
            <div className="w-full ">
              <InputField
                label="Flight Departure Time"
                name="time"
                id="time"
                placeholder="Type your flight departure time"
                value={time}
                onChange={handleTimeChange}
                classes="w-full "
                type="time"
                required={true}
              />
            </div>
          </section>

          <div className="flex space-x-2 items-center mt-5">
            <button
              disabled={
                !airline ||
                !flightNumber ||
                !origin ||
                !destination ||
                !date ||
                !time ||
                !capacity ||
                !price ||
                isLoading
              }
              type="submit"
              className={`py-2  text-white px-6 text-lg font-medium rounded border  ${
                !airline ||
                !flightNumber ||
                !origin ||
                !destination ||
                !date ||
                !time ||
                !capacity ||
                !price ||
                isUpdateLoading
                  ? "cursor-not-allowed bg-gray-500"
                  : "cursor-pointer bg-primary border-primary"
              }`}
            >
              {isUpdateLoading ? "Wait a moment" : "Update Flight"}
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
    </div>
  );
};

export default UpdateFlight;
