import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import getProductDetails from '../../features/getProductDetails';
import { useParams } from 'react-router-dom';
import getImage from '../../features/getImage';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

export default function ProductDetails() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<Product>();
  const [productImage, setProductImage] = useState<string>();

  useEffect(() => {
    async function fetchProductDetails() {
      const productDetails: Product = await getProductDetails(productId);
      setProductDetails(productDetails);
    }

    async function fetchImage() {
      if (productId !== undefined) {
        setProductImage(await getImage(productId));
      }
    }

    fetchProductDetails();
    fetchImage();
  }, []);

  return (
    <>
      <Layout>
        <div className="product-container">
          <div className="product-preview">
            <img id="main-image" src={productImage} alt="Product Image" />
          </div>
          <div className="product-detail">
            <div className="price">${productDetails?.price}</div>
            <div className="name">{productDetails?.product_name}</div>
            {/*<div className="contacts">*/}
            {/*    <button onClick="location.href='https://t.me/username'">Contact on Telegram</button>*/}
            {/*</div>*/}
            <div className="address">1234 Street Name, City, Country</div>
            <div className="description">{productDetails?.description}</div>
            <div className="wish-share">
              <div className="wishlist">
                <button>Add to Wishlist</button>
              </div>
              <div className="share">
                <button>Share</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
