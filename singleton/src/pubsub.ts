import { createClient } from 'redis';

const client = createClient({ url: 'redis://127.0.0.1:6379' });

const connectToRedis = async () => {
  try {
    await client.connect();
    console.log('Connected to redis');
  } catch (err) {
    console.log('Could not connect to redis');
    console.log(err);
  }
};

connectToRedis();

export class PubSubManager {
  stockUserMap = new Map<string, string[]>();
  private static instance: PubSubManager;
  private constructor() {}

  static getInstance() {
    if (PubSubManager.instance) {
      return PubSubManager.instance;
    }
    PubSubManager.instance = new PubSubManager();
    return PubSubManager.instance;
  }

  async addUserToStock(userName: string, stockName: string) {
    const mappy = this.stockUserMap;
    const initialVal = mappy.get(stockName) || [];
    initialVal?.push(userName);
    mappy.set(stockName, initialVal);
    await client.subscribe(stockName, (message) => {
      console.log('Received message');
    });
  }

  async removeUserFromStock(userName: string, stockName: string) {
    const mappy = this.stockUserMap;
    const initialVal = mappy.get(stockName) || [];
    const newVal = initialVal?.filter((user) => user !== userName);
    mappy.set(stockName, newVal);
    if (!newVal) {
      await client.unsubscribe(stockName);
    }
  }
}
