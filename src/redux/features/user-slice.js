import apiSlice from "./api-slice";

const UserSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (payload) => ({
                url: `/register`,
                method: "POST",
                body: payload
            }),
            providesTags: [""],
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: `/login`,
                method: "POST",
                body: payload
            }),
            providesTags: [""],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = UserSlice;
