import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseURL} from "@api/api.js";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access');
            if (token) {
                headers.set('authorization', token)
            }
            return headers
        }
    }),
    endpoints: (build) =>({
        getMe: (build.mutation({
            query: () => ({
                url: 'user/me',
                method: "POST"
            })
        })),
        login: (build.mutation({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body
            })
        }))
    })
})

