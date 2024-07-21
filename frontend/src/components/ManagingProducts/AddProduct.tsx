import Layout from '../Layout/Layout';
import React, { FormEvent } from 'react';
import './AddProduct.css';
import ManagingPanel from './ManagingPanel';
import { app, storage } from '../../firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';
import { uploadBytes, ref as storageRef } from 'firebase/storage';
import { Guid } from 'guid-typescript';

export default function AddProduct() {
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const form = event.currentTarget;

    const product_name: string = (form[0] as HTMLInputElement).value;
    const price: number = Number((form[1] as HTMLInputElement).value);
    const main_image: File = (form[2] as HTMLInputElement).files![0];
    const description: string = (form[3] as HTMLInputElement).value;

    const userEmail: string | null = localStorage.getItem('userEmail');
    let validEmail: string = '';
    if (userEmail) {
      validEmail = userEmail.replace('@', '_at_');
      validEmail = validEmail.replace('.', ',');
    }

    const guid = Guid.create().toString();
    console.log(guid);

    const db = getDatabase(app);
    const userProductsRef = ref(db, `users/${validEmail}/${guid}`);

    set(userProductsRef, {
      product_id: guid,
      product_name: product_name,
      price: price,
      description: description
    }).catch((error) => alert(error));

    const allProducts = ref(db, `products/${guid}`);
    set(allProducts, {
      product_id: guid,
      product_name: product_name,
      price: price,
      description: description,
      customerEmail: userEmail
    }).catch((error) => alert(error));

    const imageRef = storageRef(storage, `images/${guid}`);
    uploadBytes(imageRef, main_image);
  }

  return (
    <>
      <Layout>
        <div id="main-window">
          <ManagingPanel />
          <div id="main-content">
            <div id="title">
              <h1>Add product</h1>
            </div>
            <div id="product-addition">
              <form onSubmit={handleSubmit}>
                <label htmlFor="title-input">
                  Title
                  <input type="text" id="title-input" required />
                </label>
                <label htmlFor="price-input">
                  Price
                  <input type="number" id="price-input" required />
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
