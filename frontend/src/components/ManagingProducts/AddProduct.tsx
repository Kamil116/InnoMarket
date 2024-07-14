import Layout from "../Layout/Layout";
import React, {FormEvent} from "react";
import "./AddProduct.css";
import ManagingPanel from "./ManagingPanel";
import app from "../../firebaseConfig";
import {getDatabase, ref, set, push} from "firebase/database";


export default function AddProduct() {
    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const form = event.currentTarget;

        const product_name: string = (form[0] as HTMLInputElement).value;
        const price: number = Number((form[1] as HTMLInputElement).value);
        const main_image: File = (form[2] as HTMLInputElement).files![0];
        console.log(main_image);
        const additional_images: FileList | null = (form[3] as HTMLInputElement).files;
        const description: string = (form[4] as HTMLInputElement).value;

        const userEmail: string | null = localStorage.getItem("userEmail");
        let validEmail: string = '';
        if (userEmail) {
            validEmail = userEmail.replace('@', '_at_')
            validEmail = validEmail.replace('.', ',')
        }

        const db = getDatabase(app);
        const userProductsRef = ref(db, `products/users/${validEmail}/${product_name}`);

        set(userProductsRef, {
            product_name: product_name,
            price: price,
            main_image: main_image,
            description: description,
        })
            .then(() => alert('Data saved'))
            .catch((error) => alert(error));

        const allProducts = ref(db, `products/all/`);
        push(allProducts, {
            product_name: product_name,
            price: price,
            main_image: main_image,
            description: description,
            customerEmail: userEmail,
        })
            .then(() => alert('Data saved'))
            .catch((error) => alert(error));
    }

    return (
        <>
            <Layout>
                <div id="main-window">
                    <ManagingPanel/>
                    <div id="main-content">
                        <div id="title">
                            <h1>Add product</h1>
                        </div>
                        <div id="product-addition">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title-input">
                                    Title
                                    <input type="text" id="title-input" required/>
                                </label>
                                <label htmlFor="price-input">
                                    Price
                                    <input type="number" id="price-input" required/>
                                </label>
                                <label htmlFor="main-image-input">
                                    Main image
                                    <input
                                        type="file"
                                        id="main-image-input"
                                        className="image-input"
                                        required
                                    />
                                </label>
                                <label htmlFor="add-images-input">
                                    Additional images
                                    <input
                                        type="file"
                                        multiple
                                        id="add-images-input"
                                        className="image-input"
                                    />
                                </label>
                                <label htmlFor="description-input">
                                    Description
                                    <textarea id="description-input" required></textarea>
                                </label>
                                <div id="submit-button-div">
                                    <button id="submit-button">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


