import React, { useEffect, useState } from 'react';
import './RegularProduct.css';
import getImage from '../../../features/getImage';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

export default function RegularProduct(props: { product: Product }) {
  const item: Product = props.product;
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchImage() {
      try {
        const url = await getImage(item.product_id);
        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    fetchImage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading image</div>;
  }

  return (
    <div id="product-div">
      <img src={imageUrl} id="product-image" alt="product image" />
      <h2>{item.product_name}</h2>
      <h3>${item.price}</h3>
    </div>
  );
}
