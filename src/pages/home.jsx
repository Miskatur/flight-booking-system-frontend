import React, { useEffect, useState } from "react";
import banner from "../assets/banner/banner-bg.jpg";
import { useNavigate } from "react-router-dom";
import Spinner from "../shared/loader";
import { useGetAllLocationsQuery } from "../redux/features/flights-slice";
import { toast } from "sonner";
const Home = () => {
  const navigate = useNavigate();
  const today = new Date();
  const { data, isLoading } = useGetAllLocationsQuery();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setOrigin(data?.data?.[0]);
    setDestination(data?.data?.[1]);
    setDate(today.toISOString().split("T")[0]);
  }, [data?.data]);

  const handleSearch = () => {
    if (!origin || !destination) {
      toast.error("Please fill both the origin and destination fields");
      return;
    }
    if (origin === destination) {
      toast.error("Origin and destination cannot be same");
      return;
    }
    navigate(
      `/search?origin=${origin}&destination=${destination}&date=${date}`
    );
  };
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto min-h-[80vh]">
        <div className="flex justify-center items-center min-h-screen banner-bg">
          <div className="bg-white p-10 rounded-lg ">
            <form className="grid md:grid-cols-2 xl:grid-cols-4 items-center gap-5">
              <div>
                <label htmlFor="origin" className="block font-medium text-lg">
                  From <span className="text-red-500">*</span>
                </label>

                <select
                  name="origin"
                  id="origin"
                  className="px-4 py-2 rounded outline-none focus:outline-none border border-primary/50 w-64"
                  onChange={(e) => setOrigin(e.target.value)}
                  value={origin}
                >
                  {data?.data?.map((location, index) => {
                    return (
                      <option
                        className={`${
                          location === destination
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                        key={index}
                        value={location}
                        disabled={location === destination}
                      >
                        {location}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  htmlFor="destination"
                  className="block font-medium text-lg"
                >
                  To <span className="text-red-500">*</span>
                </label>

                <select
                  name="destination"
                  id="destination"
                  className="px-4 py-2 rounded outline-none focus:outline-none border border-primary/50 w-64"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                >
                  {data?.data?.map((location, index) => {
                    return (
                      <option
                        className={`${
                          location === origin
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : ""
                        }`}
                        key={index}
                        value={location}
                        disabled={location === origin}
                      >
                        {location}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block font-medium text-lg">
                  Departure
                </label>

                <input
                  type="date"
                  name="date"
                  id={"date"}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-4 py-1.5 rounded outline-none focus:outline-none border border-primary/50 w-64"
                  placeholder="Departure date"
                />
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="py-2 w-full text-white  text-lg font-medium rounded  border bg-primary border-primary "
                  onClick={handleSearch}
                >
                  Search Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
