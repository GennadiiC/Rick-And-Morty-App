import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rickMortyApi = createApi({
  reducerPath: 'rickMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (build) => ({
    getCharacterByName: build.query({
      query: (query) => `character/?name=${query}`,
    }),
    getEpisodeForCharacter: build.query({
      query: (query) => `episode/${query}`
    }),
    getAllCharactersByPage: build.query({
      query: (query) => `character/?page=${query}`
    }),
    getAllCharacters: build.query({
      query: () => 'character'
    }),
    getAllNames: build.query({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const pages = new Array(42)
          .fill()
          .map((p, i) => p = i + 1)
        const results = await Promise.all(
          pages.map(page => 
            baseQuery(`https://rickandmortyapi.com/api/character/?page=${page}`)
          )
        )
        const merged = [].concat(...results.map(result => result.data))
        const errors = [].concat(...results.filter(result => result.error !== null).map(result => result.error))
        // const usefulData = [].concat.apply([], merged.map(res => res.results))
        const usefulData = merged.map(res => res.results).flat()

        if (errors.length > 0 && merged.includes(undefined)) {
          return { error: 'there is an error' }
        }

        return { data: usefulData }
      }
    })
  }),
})

export const { 
  useGetCharacterByNameQuery, 
  useGetEpisodeForCharacterQuery, 
  useGetAllCharactersByPageQuery ,
  useGetAllCharactersQuery,
  useGetAllNamesQuery
} = rickMortyApi;