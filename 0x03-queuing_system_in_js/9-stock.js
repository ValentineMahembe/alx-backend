import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = redis.createClient();

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 },
];

const getItemById = (id) => {
  return listProducts.find(product => product.id === id);
};

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const getAsync = promisify(client.get).bind(client);
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
};

app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock
  })));
});

app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);
  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    const currentReservedStock = await getCurrentReservedStockById(itemId);
    const currentQuantity = item.stock - currentReservedStock;
    res.json({ itemId, itemName: item.name, price: item.price, initialAvailableQuantity: item.stock, currentQuantity });
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);
  if (!item) {
    res.json({ status: 'Product not found' });
  } else {
    const currentReservedStock = await getCurrentReservedStockById(itemId);
    if (currentReservedStock >= item.stock) {
      res.json({ status: 'Not enough stock available', itemId });
    } else {
      reserveStockById(itemId, currentReservedStock + 1);
      res.json({ status: 'Reservation confirmed', itemId });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
