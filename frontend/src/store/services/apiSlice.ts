import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Country, ExchangeRates } from '../../types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      queryFn: async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies');
          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
    }),
    getExchangeRates: builder.query<ExchangeRates, string>({
      queryFn: async (baseCurrency) => {
        try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
          const data = await response.json();
          return { data };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
    }),
  }),
});

export const { useGetCountriesQuery, useGetExchangeRatesQuery } = apiSlice;