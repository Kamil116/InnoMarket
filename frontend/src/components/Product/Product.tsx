import React, {useEffect, useState} from "react";
import './Product.css'
import getImage from "../../features/getImage";

type Product = {
    product_id: string,
    product_name: string,
    price: number,
    description: string,
    customerEmail: string,
};

export default function Product(props: { product: Product; }) {
    let product: Product = props.product;
    const [imageUrl, setImageUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchImage() {
            try {
                const url = await getImage(product.product_id);
                setImageUrl(url);
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        }

        fetchImage();
    }, []);

    async function waitImage() {
        return await getImage(product.product_id);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading image</div>;
    }

    return (
        <div id='product-div'>
            <img src={imageUrl}  alt='product image'/>
            <h1>{product.product_name}</h1>
            <h2>{product.price}</h2>
        </div>
    )
}