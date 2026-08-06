import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers) => {
            const token = "1|TKbOE7YXBJR6CmtZ2qKOmUGwcfKxrnoHq88A3VB67d8fa869";
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Note', 'Tag'],
    endpoints: () => ({}),
});
