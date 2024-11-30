import apiSlice from "./api-slice";

const BookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllBookings: builder.query({
            query: ({ token, page, limit }) => ({
                url: `/bookings?page=${page}&limit=${limit}`,
                method: "GET",
                headers: {
                    authorization: token,
                },
            }),
            providesTags: ["Bookings"],
        }),
        cancelABooking: builder.mutation({
            query: ({ token, id }) => ({
                url: `/bookings/${id}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
            }),
            invalidatesTags: ["Bookings"],
        }),
        deleteABooking: builder.mutation({
            query: ({ token, id }) => ({
                url: `/bookings/${id}`,
                method: "DELETE",
                headers: {
                    authorization: token,
                },
            }),
            invalidatesTags: ["Bookings"],
        }),

    }),
});

export const {
    useGetAllBookingsQuery,
    useCancelABookingMutation,
    useDeleteABookingMutation
} = BookingSlice;
