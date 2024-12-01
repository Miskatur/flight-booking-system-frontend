import React from "react";
import { useGetBookingsByUserIDQuery } from "../../redux/features/bookings-slice";
import useCurrentUser from "../../hook/useCurrentuser";
import DashboardHeader from "../../utils/dashboardHeader";
import Breadcrumbs from "../../utils/breadcrumbs";
import Spinner from "../../shared/loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../utils/table";
const headers = [
  "SL No.",
  "User Info",
  "User Phone",
  "Flight Details",
  "Seats",
  "Total Price",
  "Status",
];

const MyBookings = () => {
  const { token, name } = useCurrentUser();
  const { data, isLoading } = useGetBookingsByUserIDQuery({ token });
  return (
    <div className="max-w-7xl mx-auto py-6 px-2 lg:px-0">
      <div className="my-3">
        <Breadcrumbs
          currentPath={`My Bookings`}
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
            {data?.data &&
              data?.data?.length > 0 &&
              data?.data?.map((info, index) => (
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {data?.data?.data?.length === 0 && (
          <p className="text-center w-full py-2">No data found</p>
        )}
        {isLoading && (
          <div className="h-screen">
            <Spinner />
          </div>
        )}
        {/* pagination */}
      </div>
    </div>
  );
};

export default MyBookings;
