import axios from 'axios';
import type { Country } from '@/types';

const REST_COUNTRIES_URL = 'https://restcountries.com/v3.1';

export const countriesService = {
  /**
   * Fetch all countries with their currencies
   */
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await axios.get<Country[]>(
        `${REST_COUNTRIES_URL}/all?fields=name,cca2,currencies`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  },

  /**
   * Fetch a specific country by code
   */
  async getCountryByCode(code: string): Promise<Country> {
    try {
      const response = await axios.get<Country[]>(
        `${REST_COUNTRIES_URL}/alpha/${code}?fields=name,cca2,currencies`
      );
      return response.data[0];
    } catch (error) {
      console.error(`Error fetching country ${code}:`, error);
      throw new Error(`Failed to fetch country ${code}`);
    }
  },

  /**
   * Extract currencies from a country
   */
  extractCurrencies(country: Country) {
    const currencies = country.currencies || {};
    return Object.entries(currencies).map(([code, currency]) => ({
      code,
      name: currency.name,
      symbol: currency.symbol,
    }));
  },
};
