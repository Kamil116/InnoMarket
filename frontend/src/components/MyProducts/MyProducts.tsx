import React, {useEffect, useState} from "react";
import Layout from "../Layout/Layout";
import ManagingPanel from "../ManagingProducts/ManagingPanel";
import './MyProducts.css'
import getProducts from "../../features/getProducts";
import Product from "../Product/Product";

type Product = {
    product_name: string;
    price: number;
    description: string;
};

export default function MyProducts() {
    let count: number = 0;
    const userEmail = localStorage.getItem("userEmail")!;
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const productsData = await getProducts(userEmail);
            setProducts(productsData || []);
        }

        fetchProducts();
    }, []);


    return (
        <Layout>
            <div id='main-window-my-products'>
                <ManagingPanel />
                <div id='my-products-content'>
                    {products.map((product) => (
                        <Product product={product} key={count++}/>
                    ))}
                </div>
            </div>

        </Layout>
    )
}