import React from "react";
import './Product.css'

type Product = {
    product_name: string;
    price: number;
    description: string;
};

export default function Product(props: { product: Product; }) {
    let product: Product = props.product;
    return (
        <div id='product-div'>
            <h1>{product.product_name}</h1>
            <h2>{product.price}</h2>
        </div>
    )
}