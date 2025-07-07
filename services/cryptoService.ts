import { Coin } from '../types';

// A fake database of coins to simulate an API
const initialCoins: Coin[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 68000 },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 3500 },
  { id: 'solana', name: 'Solana', symbol: 'SOL', price: 150 },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', price: 0.52 },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.16 },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.45 },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 35 },
  { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB', price: 0.000025 },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', price: 0.72 },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 17.5 },
];

let coinDatabase: Coin[] = JSON.parse(JSON.stringify(initialCoins));


// A simple pseudorandom number generator to avoid dependency on external libraries.
// This is not cryptographically secure, but fine for this simulation.
class Random {
    private seed: number;

    constructor() {
        this.seed = Math.floor(Math.random() * 100000);
    }

    public nextInt(max: number): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return Math.floor((this.seed / 233280) * max);
    }

    public nextDouble(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}

const random = new Random();

// Simulates a network call to fetch all coins.
export const fetchTopCoins = (): Promise<Coin[]> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency
    setTimeout(() => {
      // Simulate random network errors
      if (random.nextInt(10) === 0) {
        reject(new Error('Network Error: Could not reach API!'));
        return;
      }

      // Create a fresh list with slightly changed prices
      coinDatabase = coinDatabase.map(coin => {
        const changePercent = (random.nextDouble() - 0.48) * 0.1; // Fluctuate by up to 5%
        const newPrice = coin.price * (1 + changePercent);
        return { ...coin, price: newPrice };
      });
      
      resolve(JSON.parse(JSON.stringify(coinDatabase)));
    }, 500 + random.nextDouble() * 500); // Latency between 500ms and 1000ms
  });
};
