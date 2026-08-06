import { baseApi } from '../shared/baseApi';

export const tagsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTags: builder.query({
            query: () => '/tags',
            providesTags: ['Tag'],
            transformResponse: (response) => response.data,
        }),

        createTag: builder.mutation({
            query: (newTag) => ({
                url: '/tags',
                method: 'POST',
                body: newTag,
            }),
            invalidatesTags: ['Tag'],
        }),
    }),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagsApi;
