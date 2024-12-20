import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";
import { usersInfoApi } from "./apis/usersInfoApi";

export const store = configureStore({
    reducer: {
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
        [usersInfoApi.reducerPath]: usersInfoApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
            .concat(usersInfoApi.middleware)
    }
});

window.store = store;

setupListeners(store.dispatch);
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from "./apis/albumsApi";
export {useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation, useFetchAllPhotosQuery} from "./apis/photosApi";
export {useAddInfoMutation, useUpdateUserInfoMutation, useFetchInfoQuery, } from "./apis/usersInfoApi";