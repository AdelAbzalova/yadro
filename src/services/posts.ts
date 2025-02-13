import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Post } from '../models/Post'
import { Comment } from '../models/Comment'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: builder => ({
    getPosts: builder.query<Post[], { limit: number; page: number }>({
      query: ({ limit = 5, page = 1 }) => ({
        url: `/posts`,
        params: {
          _limit: limit,
          _page: page,
        },
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: id => `/posts/${id}`,
    }),
    getPostComments: builder.query<Comment[], string>({
      query: id => `/posts/${id}/comments`,
    }),
  }),
})
