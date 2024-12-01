import apiSlice from "./api-slice";

const BookingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlights: builder.query({
            query: ({ token, page, limit, allFlights }) => ({
                url: `/flights?page=${page}&limit=${limit}&admin=${allFlights}`,
                method: "GET",
                headers: {
                    authorization: token,
                },
            }),
            providesTags: ["Flights"],
        }),
        getAFlightInfo: builder.query({
            query: ({ token, id }) => ({
                url: `/flights/${id}`,
                method: "GET",
                headers: {
                    authorization: token,
                },
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
    useGetAFlightInfoQuery
} = BookingSlice;
