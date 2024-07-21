import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import ManagingPanel from '../ManagingProducts/ManagingPanel';
import './MyProducts.css';
import getProductsByEmail from '../../features/getProductsByEmail';
import UpdatableProduct from '../Products/UpdatableProduct/UpdatableProduct';
import deleteProduct from '../../features/deleteProduct';
import updateProduct from '../../features/updateProduct';

type Product = {
  product_id: string;
  product_name: string;
  price: number;
  description: string;
  customerEmail: string;
};

export default function MyProducts() {
  let count: number = 0;
  const userEmail = localStorage.getItem('userEmail')!;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const productsData = await getProductsByEmail(userEmail);
      setProducts(productsData || []);
    }

    fetchProducts();
  }, []);

  async function handleDelete(id: string): Promise<void> {
    await deleteProduct(id, userEmail);

    const newArray: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_id !== id) {
        newArray.push(products[i]);
      }
    }

    setProducts(newArray);
  }

  async function handleUpdate(updatedProduct: Product): Promise<void> {
    await updateProduct(userEmail, updatedProduct);

    const newArray: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].product_id === updatedProduct.product_id) {
        newArray.push(updatedProduct);
      } else {
        newArray.push(products[i]);
      }
    }

    setProducts(newArray);
  }

  return (
    <Layout>
      <div id="main-window-my-products">
        <ManagingPanel />
        <div id="my-products-content">
          {products.map((product) => (
            <UpdatableProduct
              product={product}
              key={count++}
              deleteProduct={handleDelete}
              updateProduct={handleUpdate}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
