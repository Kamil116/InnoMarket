import React, {useEffect, useState} from "react";
import Layout from "../Layout/Layout";
import './AllProducts.css'
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

export default function AllProducts(): React.ReactElement {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchProducts() {
            const productsData = await getProducts();
            setProducts(productsData || []);
        }

        fetchProducts();
    }, []);


    return (
        <>
            <Layout>
                <div className="all-products">
                    {products.map((product) => (
                        <Link style={{color: 'black'}} to={`/products/${product.product_id}`}><RegularProduct
                            product={product} key={Math.random()}/></Link>
                    ))}
                </div>
            </Layout>
        </>
    )
}
