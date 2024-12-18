import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL
});

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ["Bookings", "Flights", "User", "Overview"],
});

export default apiSlice;
