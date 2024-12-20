import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints(builder) {
    return {

      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.userId }];
        },
        query: (album) => {
          return {
            method: 'DELETE',
            url: '/albums/' + album.id,
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }];
        },
        query: ({ id, albumName }) => {
          return {
            url: '/albums',
            body: {
              userId: id,
              title: albumName,
            },
            method: 'POST',
          };
        },

        onSuccess: (data, variables, context) => {
          context.dispatch(
            albumsApi.util.updateQueryData('fetchAlbums', variables, (prevData) => {
              return [...prevData, data];
            })
          );
        },
      }),

      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
              _sort: 'id',
              _order: 'desc',
            },
            method: 'GET',
          };
        },
      }),
      
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
