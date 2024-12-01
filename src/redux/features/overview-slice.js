import apiSlice from "./api-slice";

const OverviewSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        overview: builder.query({
            query: ({ token }) => ({
                url: `/overview`,
                method: "GET",
                headers: {
                    authorization: token,
                },
            }),
            providesTags: ["Overview"],
        }),

    }),
});

export const { useOverviewQuery } = OverviewSlice;
