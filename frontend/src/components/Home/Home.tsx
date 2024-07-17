import React, {useEffect, useState} from "react";
import Layout from "../Layout/Layout";
import './Home.css'
import getProducts from "../../features/getProducts";
import RegularProduct from '../Products/RegularProduct/RegularProduct';
import {Link} from "react-router-dom";

type Product = {
    product_id: string,
    product_name: string,
    price: number,
    description: string,
    customerEmail: string,
};

export default function Home(): React.ReactElement {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const productsData = await getProducts();
            let slicedData;
            if (productsData.length >= 8) {
                slicedData = productsData.slice(0, 8);
            } else {
                slicedData = productsData;
            }
            setProducts(slicedData || []);
        }

        fetchProducts();
    }, []);


    return (
        <>
            <Layout>
                <div className="products">
                    <div className="heading">
                        <p>New items</p>
                        <div className="explore">
                            <button>Explore all products</button>
                        </div>
                    </div>
                    <div className="product-list" >
                        {products.map((product) => (
                            <Link style={{color: 'black'}} to={`/products/${product.product_id}`}><RegularProduct product={product} key={Math.random()}/></Link>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}