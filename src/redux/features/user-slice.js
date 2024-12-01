import apiSlice from "./api-slice";

const UserSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (payload) => ({
                url: `/register`,
                method: "POST",
                body: payload
            }),
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: `/login`,
                method: "POST",
                body: payload
            }),
            providesTags: ["User"],
        }),
        changePassword: builder.mutation({
            query: ({ token, payload }) => ({
                url: `/change-password`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                body: payload
            }),
            invalidatesTags: ["User"],
        }),
        updateProfile: builder.mutation({
            query: ({ token, payload }) => ({
                url: `/update`,
                method: "PATCH",
                headers: {
                    authorization: token,
                },
                body: payload
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useChangePasswordMutation, useUpdateProfileMutation } = UserSlice;
