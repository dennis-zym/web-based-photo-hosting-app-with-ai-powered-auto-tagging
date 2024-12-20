import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const usersInfoApi = createApi({
  reducerPath: 'userInfo',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints(builder) {
    return {
      
      addInfo: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Info', id: user.id }];
        },
        query: ({ userId, userName, bio, profileUrl }) => {
          return {
            url: '/userInfo',
            body: {
              userId: userId,
              userName: userName,
              bio: bio,
              profileUrl: profileUrl,
            },
            method: 'POST',
          };
        },
      }),

      updateUserInfo: builder.mutation({
        query: ({ userId, userName, profileUrl, bio }) => {
          return {
            url: `/userInfo/${userId}`,
            body: {
              userName: userName,
              profileUrl: profileUrl,
              bio: bio,
            },
            method: 'PATCH',
          };
        },
        invalidatesTags: ['Info'],
      }),

      fetchInfo: builder.query({
        providesTags: (result, error, userId) => {
          return [{ type: 'Info', id: userId.id }];
        },
        query: (userId) => {
          return {
            url: '/userInfo',
            params: {
              userId: userId.id,
            },
            method: 'GET',
          };
        },
      }),

    };
  },
});

export const {
  useAddInfoMutation,
  useUpdateUserInfoMutation,
  useFetchInfoQuery,
} = usersInfoApi;
export { usersInfoApi };
