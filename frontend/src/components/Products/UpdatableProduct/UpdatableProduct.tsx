import React, { FormEvent, useEffect, useState } from 'react';
import './UpdatableProduct.css';
import getImage from '../../../features/getImage';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

type Props = {
  product: Product;
  deleteProduct: (id: string) => Promise<void>;
  updateProduct: (updatedProduct: Product) => Promise<void>;
};

export default function updatableProduct(props: Props) {
  const item: Product = props.product;
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);

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

  function handleEdit() {
    setIsEditing(true);
  }

  function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const product_name: string = (form[0] as HTMLInputElement).value;
    const price: number = Number((form[1] as HTMLInputElement).value);
    const updatedProduct: Product = {
      ...item,
      product_name: product_name,
      price: price
    };
    props.updateProduct(updatedProduct);
    setIsEditing(false);
  }

  return (
    <div id="product-div">
      <img src={imageUrl} alt="product image" />
      {isEditing ? (
        <>
          <form onSubmit={handleUpdate}>
            <input
              className="update-input"
              type="text"
              defaultValue={item.product_name}
            />
            <input
              className="update-input"
              type="number"
              defaultValue={item.price}
            />
            <button className="update-button">Update</button>
          </form>
        </>
      ) : (
        <>
          <h2>{item.product_name}</h2>
          <h3>${item.price}</h3>
          <button className="edit-button" onClick={() => handleEdit()}>
            Edit
          </button>
        </>
      )}
      <button
        className="delete-button"
        onClick={() => props.deleteProduct(item.product_id)}
      >
        Delete
      </button>
    </div>
  );
}
