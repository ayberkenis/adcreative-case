// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../types/constants';
import type {CharacterList, Response} from '../../types/character';

// Define a service using a base URL and expected endpoints
export const rickandmortyApi = createApi({
  reducerPath: 'rickandmortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  
  endpoints: (builder) => ({
    GetCharacter: builder.query<CharacterList, string>({
      query: (name) => `character?name=${name}`,
      transformResponse: (response: Response, meta, arg) => response.results,
      keepUnusedDataFor: 5,
    }),
    
  }),

})


export const { useGetCharacterQuery } = rickandmortyApi