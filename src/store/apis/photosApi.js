import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints(builder) {
    return {
      
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.albumId }];
        },
        query: (photo) => {
          return {
            method: 'DELETE',
            url: '/photos/' + photo.id,
          };
        },
      }),

      addPhoto: builder.mutation({
        invalidatesTags: (result, error, params) => {
          return [{ type: 'Photo', id: params.album.id }];
        },
        query: (params) => {
          return {
            url: '/photos',
            body: {
              albumId: params.album.id,
              privacy: 'public',
              url: params.image_url,
              tags: params.tags,
            },
            method: 'POST',
          };
        },
      }),

      updatePrivacy: builder.mutation({
        query: ({ photoId, privacy }) => {
          return {
            url: `/photos/${photoId}`,
            body: {
              privacy: privacy,
            },
            method: 'PATCH',
          };
        },
        invalidatesTags: ['Photo'],
      }),

      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          return [{ type: 'Photo', id: album.id }];
        },
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),

      fetchAllPhotos: builder.query({
        providesTags: (result, error, album) => {
          return [{ type: 'Photo', id: 'all' }];
        },
        query: (tag) => {
          if (tag)
            return {
              url: '/photos',
              params: {
                tags_like: '.*' + tag + '.*',
              },
              method: 'GET',
            };
          return {
            url: '/photos',
            method: 'GET',
          };
        },
      }),

    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useUpdatePrivacyMutation,
  useRemovePhotoMutation,
  useFetchAllPhotosQuery,
} = photosApi;
export { photosApi };
