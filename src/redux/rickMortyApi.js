import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacterByName: builder.query({
      query: (query) => `character/?name=${query}`,
    }),
    getEpisodeForCharacter: builder.query({
      query: (query) => `episode/${query}`
    })
  }),
})

export const { useGetCharacterByNameQuery, useGetEpisodeForCharacterQuery } = rickMortyApi;