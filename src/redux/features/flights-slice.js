import apiSlice from "./api-slice";

const BookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlights: builder.query({
            query: ({ page, limit, allFlights, origin, destination, date }) => ({
                url: `/flights?page=${page}&limit=${limit}&admin=${allFlights}&origin=${origin}&destination=${destination}&date=${date}`,
                method: "GET",

            }),
            providesTags: ["Flights"],
        }),
        getAllLocations: builder.query({
            query: () => ({
                url: `/flights/location`,
                method: "GET",

            }),
        }),
        getAFlightInfo: builder.query({
            query: ({ id }) => ({
                url: `/flights/${id}`,
                method: "GET",
            }),
        }),

        addAFlight: builder.mutation({
            query: ({ token, payload }) => ({
                url: `/flights`,
                method: "POST",
                headers: {
                    authorization: token,
                },
                body: payload,
            }),
            invalidatesTags: ["Flights"],
        }),
        updateAFlight: builder.mutation({
            query: ({ token, id, payload }) => ({
                url: `/flights/${id}`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                body: payload,
            }),

            invalidatesTags: ["Flights"],
        }),
        deleteAFlight: builder.mutation({
            query: ({ token, id }) => ({
                url: `/flights/${id}`,
                method: "DELETE",
                headers: {
                    authorization: token,
                },
            }),
            invalidatesTags: ["Flights"],
        }),

    }),
});

export const {
    useAddAFlightMutation,
    useGetAllFlightsQuery,
    useUpdateAFlightMutation,
    useDeleteAFlightMutation,
    useGetAFlightInfoQuery,
    useGetAllLocationsQuery
} = BookingSlice;
