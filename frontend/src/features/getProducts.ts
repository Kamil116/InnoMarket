import { getDatabase, ref, get } from 'firebase/database';
import { app } from '../firebaseConfig';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

async function getProducts(): Promise<Product[]> {
  const db = getDatabase(app);
  const dbRef = ref(db, `products/`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return Object.values(snapshot.val());
  } else {
    return [];
  }
}

export default getProducts;
