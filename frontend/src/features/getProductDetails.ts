import { get, getDatabase, ref } from 'firebase/database';
import { app } from '../firebaseConfig';

async function getProductDetails(product_id: string | undefined) {
  if (product_id === undefined) {
    return undefined;
  }
  const db = getDatabase(app);
  const dbRef = ref(db, `products/${product_id}`);
  const snapshot = await get(dbRef);
  return snapshot.val();
}

export default getProductDetails;
