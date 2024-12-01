import apiSlice from "./api-slice";

const BookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlights: builder.query({
            query: ({ page, limit, allFlights, origin, destination, date }) => {
                const params = new URLSearchParams();

                // Always include page and limit
                params.append("page", page.toString());
                params.append("limit", limit.toString());
                params.append("admin", allFlights);

                // Conditionally add other parameters
                if (origin) params.append("origin", origin);
                if (destination) params.append("destination", destination);
                if (date) params.append("date", date);

                return {
                    url: `/flights?${params.toString()}`,
                    method: "GET",
                };

            },
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
            invalidatesTags: ["Flights", "Overview"],
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

            invalidatesTags: ["Flights", "Overview"],
        }),
        deleteAFlight: builder.mutation({
            query: ({ token, id }) => ({
                url: `/flights/${id}`,
                method: "DELETE",
                headers: {
                    authorization: token,
                },
            }),
            invalidatesTags: ["Flights", "Overview"],
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
