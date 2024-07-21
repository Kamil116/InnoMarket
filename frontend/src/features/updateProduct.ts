import { getDatabase, ref, update } from 'firebase/database';
import { app } from '../firebaseConfig';
import encodeEmail from './encodeEmail';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

async function updateProduct(userEmail: string, product: Product) {
  const db = getDatabase(app);
  const usersDatabaseRef = ref(
    db,
    `users/${encodeEmail(userEmail)}/${product.product_id}`
  );
  const productsDatabaseRef = ref(db, `products/${product.product_id}`);

  await update(usersDatabaseRef, product);
  await update(productsDatabaseRef, product);
}

export default updateProduct;
