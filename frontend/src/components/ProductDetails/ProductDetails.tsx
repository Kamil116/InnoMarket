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
            <div className="name">
              <h1>{productDetails?.product_name}</h1>
            </div>
            <div className="price">
              <h2>${productDetails?.price}</h2>
            </div>
            <div className="description">
              <h3>{productDetails?.description}</h3>
              <a
                href={'mailto:' + productDetails?.customerEmail}
                style={{ color: 'inherit' }}
              >
                <h2>Contact me: {productDetails?.customerEmail}</h2>
              </a>
            </div>
            <div className="wish-share">
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
