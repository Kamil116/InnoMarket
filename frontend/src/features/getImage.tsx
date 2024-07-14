import {ref as storageRef, getDownloadURL} from "firebase/storage";
import {storage} from "../firebaseConfig";

export default function getImage(image_id: string) {
    const imageRef = storageRef(storage, `images/${image_id}`)
    // console.log(getDownloadURL(imageRef))
    return getDownloadURL(imageRef)
}