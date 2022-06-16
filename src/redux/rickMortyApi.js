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
    }),
    getAllCharactersByPage: builder.query({
      query: (query) => `character/?page=${query}`
    }),
    getAllCharacters: builder.query({
      query: (query) => 'character'
    })
  }),
})

export const { 
  useGetCharacterByNameQuery, 
  useGetEpisodeForCharacterQuery, 
  useGetAllCharactersByPageQuery ,
  useGetAllCharactersQuery
} = rickMortyApi;