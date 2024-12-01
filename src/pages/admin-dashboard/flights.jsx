import React, { useState } from "react";
import DashboardHeader from "../../utils/dashboardHeader";
import ProductRoute from "../../components/flights/productRoute";
import { Link } from "react-router-dom";
import {
  useDeleteAFlightMutation,
  useGetAllFlightsQuery,
} from "../../redux/features/flights-slice";
import useCurrentUser from "../../hook/useCurrentuser";
import Pagination from "../../utils/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../utils/table";
import { Edit, Trash2 } from "lucide-react";
import moment from "moment";

const headers = [
  "SL No.",
  "Airline & Flight Number",
  "Departure Date & Time (24hr)",
  "Origin",
  "Destination",
  "Seats",
  "Remaining",
  "Price",
  "Update",
  "Delete",
];

const Flights = () => {
  const [activeRoute, setActiveRoute] = useState("1");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deletingId, setDeletingId] = useState(null);
  const { token } = useCurrentUser();
  const { data, isLoading } = useGetAllFlightsQuery({
    token,
    page,
    limit,
    allFlights: activeRoute,
  });
  const [deleteAFlight, { isLoading: deleteLoading }] =
    useDeleteAFlightMutation();
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteAFlight = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteAFlight({ token, id });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(
          res?.error?.data?.message ||
            "Something went wrong! Please try again later."
        );
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div>
      <DashboardHeader
        text={"All Flights"}
        classes={
          "text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
        }
      />
      <div className="my-5">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3">
          <ProductRoute
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />
          <Link to={`/admin/dashboard/flights/add-flight`}>
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Add Flight
            </button>
          </Link>
        </div>
        <div className="my-5">
          <Table>
            <TableHeader>
              <TableRow>
                {headers?.map((header) => (
                  <TableHead
                    key={header}
                    className="whitespace-nowrap font-medium text-textColor px-4 bg-white"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.data &&
                data?.data?.data?.length > 0 &&
                data?.data?.data?.map((info, index) => (
                  <TableRow key={info?.id} className="bg-gray-200">
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4 ">
                      {index + 1}.
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.airline} - {info?.flight_number}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {moment(info?.date).format("MMM Do, YYYY")} at{" "}
                      {info?.time}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.origin}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.destination}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.capacity} seats
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.remaining_seat} seats
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                      {info?.price}TK
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4 ">
                      <Link to={`/admin/dashboard/flights/update-flight/${info?.id}`}>
                        <button
                          type="button"
                          className="flex items-center font-medium hover:text-primary"
                        >
                          <Edit size={16} className="mr-1 " /> Update
                        </button>
                      </Link>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground px-4 ">
                      {deletingId === info?._id ? (
                        <p className="text-center w-full py-2">Deleting ...</p>
                      ) : (
                        <button
                          className="flex items-center font-medium hover:text-primary"
                          type="button"
                          onClick={() => handleDeleteAFlight(info?._id)}
                        >
                          <Trash2 size={20} className="mr-1 " /> Delete
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {data?.data?.data?.length === 0 && (
            <p className="text-center w-full py-2">No data found</p>
          )}
          {isLoading && <p className="text-center w-full py-2">Loading ...</p>}
          {/* pagination */}
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
      </div>
    </div>
  );
};

export default Flights;
