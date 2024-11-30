import React, { useState } from "react";
import DashboardHeader from "../../utils/dashboardHeader";
import {
  useCancelABookingMutation,
  useDeleteABookingMutation,
  useGetAllBookingsQuery,
} from "../../redux/features/bookings-slice";
import Pagination from "../../utils/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../utils/table";
import { CircleX, Trash2 } from "lucide-react";
import useCurrentUser from "../../hook/useCurrentuser";

const headers = [
  "SL No.",
  "User Info",
  "User Phone",
  "Flight Details",
  "Seats",
  "Total Price",
  "Status",
  "Cancel",
  "Delete",
];

const Bookings = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { token } = useCurrentUser();
  const { data, isLoading } = useGetAllBookingsQuery({
    token,
    page,
    limit,
  });
  const [deleteABooking, { isLoading: deleteLoading }] =
    useDeleteABookingMutation();
  const [cancelABooking, { isLoading: cancelLoading }] =
    useCancelABookingMutation();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const [deletingId, setDeletingId] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const handleDeleteBooking = async (id) => {
    setDeletingId(id);
    try {
      const res = await deleteABooking({ token, id });
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
  const handleCancelBooking = async (id) => {
    setCancellingId(id);
    try {
      const res = await cancelABooking({ token, id });
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
      setCancellingId(null);
    }
  };
  return (
    <div>
      <DashboardHeader
        text={"All Bookings"}
        classes={
          "text-xl md:text-4xl font-semibold bg-white p-4 text-primary rounded shadow-lg"
        }
      />
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
                    <div>
                      <p>Name: {info?.user?.name}</p>
                      <p>Email: {info?.user?.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    {info?.user?.phone}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    <div>
                      <p> {info?.flight_info?.airline} </p>
                      <p>
                        ({info?.flight_info?.origin}-{" "}
                        {info?.flight_info?.destination})
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    <div>
                      {info?.number_of_seats} (
                      {info?.seats?.map((seat, index) => (
                        <span key={index} className="mr-1">
                          {seat}
                          {info?.seats?.length !== index + 1 && ","}
                        </span>
                      ))}
                      )
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    {info?.total_price}TK
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    {info?.booking_status}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4">
                    {cancellingId === info?._id ? (
                      <p className="text-center w-full py-2">Cancelling ...</p>
                    ) : (
                      <>
                        <button
                          className={`flex items-center font-medium  ${
                            info?.booking_status === "CANCELLED"
                              ? "text-gray-500 cursor-not-allowed"
                              : "hover:text-primary"
                          }`}
                          type="button"
                          disabled={info?.booking_status === "CANCELLED"}
                          onClick={() => handleCancelBooking(info?._id)}
                        >
                          <CircleX size={20} className="mr-1" /> Cancel
                        </button>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground px-4 ">
                    {deletingId === info?._id ? (
                      <p className="text-center w-full py-2">Deleting ...</p>
                    ) : (
                      <button
                        className="flex items-center font-medium hover:text-primary"
                        type="button"
                        onClick={() => handleDeleteBooking(info?._id)}
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
  );
};

export default Bookings;
