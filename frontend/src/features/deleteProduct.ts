import {getDatabase, ref, remove} from "firebase/database";
import {app, storage} from "../firebaseConfig";
import encodeEmail from "./encodeEmail";
import {ref as storageRef, deleteObject} from "firebase/storage";

async function deleteProduct(product_id: string, userEmail: string) {
    await deleteFromUser(product_id, userEmail);
    await deleteFromProducts(product_id);
    await deleteImage(product_id);
}

async function deleteFromUser(product_id: string, userEmail: string) {
    const db = getDatabase(app);
    const dbRef = ref(db, `users/${encodeEmail(userEmail)}/${product_id}`)
    await remove(dbRef)
}


async function deleteFromProducts(product_id: string) {
    const db = getDatabase(app);
    const dbRef = ref(db, `products/${product_id}`)
    await remove(dbRef)
}

async function deleteImage(image_id: string) {
    const imageRef = storageRef(storage, `images/${image_id}`)
    await deleteObject(imageRef)
}

export default deleteProduct;