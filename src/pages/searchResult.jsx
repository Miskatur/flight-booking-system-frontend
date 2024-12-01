import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetAllFlightsQuery,
  useGetAllLocationsQuery,
} from "../redux/features/flights-slice";
import { toast } from "sonner";
import SingleResult from "../components/searchResult/singleResult";
import Pagination from "../utils/pagination";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: locationData, isLoading: locationQueryLoading } =
    useGetAllLocationsQuery();
  const [origin, setOrigin] = useState(searchParams.get("origin"));
  const [destination, setDestination] = useState(
    searchParams.get("destination")
  );
  const [date, setDate] = useState(searchParams.get("date"));
  const { data, isLoading, isError } = useGetAllFlightsQuery({
    page,
    limit,
    origin,
    destination,
    date,
  });
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleSearch = () => {
    if (!origin || !destination) {
      toast.error("Please fill both the origin and destination fields");
      return;
    }
    if (origin === destination) {
      toast.error("Origin and destination cannot be same");
      return;
    }
    setSearchParams({ origin, destination, date });
  };
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8 bg-white p-5 rounded-lg">
        <div>
          <label className="block font-medium text-lg">From</label>
          <select
            className="px-4 py-2 rounded border w-full"
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
          >
            {locationData?.data?.map((location, index) => {
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
          <label className="block font-medium text-lg">To</label>
          <select
            name="destination"
            id="destination"
            className="px-4 py-2 rounded outline-none focus:outline-none border border-primary/50 w-64"
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          >
            {locationData?.data?.map((location, index) => {
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
          <label className="block font-medium text-lg">Departure</label>
          <input
            type="date"
            className="px-4 py-1.5 rounded border w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
      <hr className="h-[1px] mb-8 bg-primary" />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading flights</p>
      ) : (
        <ul className="grid gap-3 w-full min-h-[50vh]">
          {data.data?.data?.map((flight) => (
            <li key={flight.id}>
              <SingleResult flight={flight} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        <Pagination
          limit={limit}
          setLimit={setLimit}
          currentPage={page}
          onPageChange={handlePageChange}
          totalItems={data?.data?.meta?.total}
        />
      </div>
    </div>
  );
};

export default SearchResult;
