import axios from 'axios';
import type { FXConversionRequest, FXConversionResponse } from '@/types';

const EXCHANGE_RATE_URL = 'https://api.exchangerate-api.com/v4';

interface ExchangeRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Cache for exchange rates (in-memory, valid for 1 hour)
const ratesCache = new Map<string, { data: ExchangeRateResponse; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const exchangeRateService = {
  /**
   * Get latest exchange rates for a base currency
   */
  async getLatestRates(baseCurrency: string): Promise<ExchangeRateResponse> {
    const cacheKey = `latest_${baseCurrency}`;
    const cached = ratesCache.get(cacheKey);

    // Return cached data if valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get<ExchangeRateResponse>(
        `${EXCHANGE_RATE_URL}/latest/${baseCurrency}`
      );

      // Cache the response
      ratesCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching rates for ${baseCurrency}:`, error);
      
      // Return cached data even if expired, as fallback
      if (cached) {
        console.warn('Using expired cache as fallback');
        return cached.data;
      }

      throw new Error(`Failed to fetch exchange rates for ${baseCurrency}`);
    }
  },

  /**
   * Convert amount from one currency to another
   */
  async convertCurrency(request: FXConversionRequest): Promise<FXConversionResponse> {
    const { from, to, amount } = request;

    // If same currency, no conversion needed
    if (from === to) {
      return {
        from,
        to,
        amount,
        convertedAmount: amount,
        rate: 1,
        timestamp: new Date(),
      };
    }

    try {
      // Get rates for base currency
      const rates = await this.getLatestRates(from);

      // Get conversion rate
      const rate = rates.rates[to];

      if (!rate) {
        throw new Error(`Exchange rate not found for ${from} to ${to}`);
      }

      const convertedAmount = amount * rate;

      return {
        from,
        to,
        amount,
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        rate,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error(`Error converting ${from} to ${to}:`, error);
      throw new Error(`Failed to convert currency from ${from} to ${to}`);
    }
  },

  /**
   * Get exchange rate between two currencies
   */
  async getExchangeRate(from: string, to: string): Promise<number> {
    if (from === to) return 1;

    const rates = await this.getLatestRates(from);
    const rate = rates.rates[to];

    if (!rate) {
      throw new Error(`Exchange rate not found for ${from} to ${to}`);
    }

    return rate;
  },

  /**
   * Convert multiple amounts at once
   */
  async batchConvert(
    requests: FXConversionRequest[]
  ): Promise<FXConversionResponse[]> {
    return Promise.all(requests.map((req) => this.convertCurrency(req)));
  },

  /**
   * Clear the rates cache
   */
  clearCache(): void {
    ratesCache.clear();
  },

  /**
   * Get all available currencies for a base currency
   */
  async getAvailableCurrencies(baseCurrency: string): Promise<string[]> {
    const rates = await this.getLatestRates(baseCurrency);
    return Object.keys(rates.rates);
  },
};
