import {get, getDatabase, ref} from "firebase/database";
import {app} from "../firebaseConfig";

type Product = {
    product_id: string,
    product_name: string,
    price: number,
    description: string,
    customerEmail: string,
};

async function getProductDetails(product_id: string): Promise<Product> {
    const db = getDatabase(app);
    const dbRef = ref(db, `products/${product_id}`)
    const snapshot = await get(dbRef);
    return snapshot.val();
}

export default getProductDetails;