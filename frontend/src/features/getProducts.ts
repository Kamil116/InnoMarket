import {getDatabase, ref, get} from "firebase/database";
import app from "../firebaseConfig";
import encodeEmail from "./encodeEmail";

type Product = {
    product_name: string;
    price: number;
    description: string;
};

async function getProducts(userEmail: string): Promise<Product[]> {
    const db = getDatabase(app);
    const dbRef = ref(db, `products/users/${encodeEmail(userEmail)}/`)
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
        return Object.values(snapshot.val())
    } else {
        return []
    }
}

export default getProducts;