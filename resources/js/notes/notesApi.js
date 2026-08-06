import { baseApi } from '../shared/baseApi';

export const notesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '/notes',
            providesTags: ['Note'],
            transformResponse: (response) => response.data,
        }),
        createNote: builder.mutation({
            query: (body) => ({
                url: '/notes',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Note'],
            transformResponse: (response) => response.data,
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/notes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
            transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetNotesQuery, useCreateNoteMutation, useDeleteNoteMutation } = notesApi;
