import React, {FormEvent, useEffect, useState} from "react";
import './Product.css'
import getImage from "../../features/getImage";

type Product = {
    product_id: string,
    product_name: string,
    price: number,
    description: string,
    customerEmail: string,
};

export default function Product(props: { product: Product, deleteProduct: Function, updateProduct: Function }) {
    let item: Product = props.product;
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

    async function waitImage() {
        return await getImage(item.product_id);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading image</div>;
    }

    function handleEdit(prod: Product) {
        setIsEditing(true)
    }

    function handleUpdate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const product_name: string = (form[0] as HTMLInputElement).value;
        const price: number = Number((form[1] as HTMLInputElement).value);
        const updatedProduct: Product = {
            ...item,
            product_name: product_name,
            price: price,
        }
        props.updateProduct(updatedProduct)
        setIsEditing(false)
    }

    return (
        <div id='product-div'>
            <img src={imageUrl} alt='product image'/>
            {isEditing ? (
                <>
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            defaultValue={item.product_name}
                            // onChange={(e) => setEditName(e.target.value)}
                        />
                        <input
                            type="number"
                            defaultValue={item.price}
                            // onChange={(e) => setEditPrice(e.target.value)}
                        />
                        <button className="update-button">Update</button>
                    </form>

                </>
            ) : (
                <>
                    <h2>{item.product_name}</h2>
                    <h3>${item.price}</h3>
                    <button className="edit-button" onClick={() => handleEdit(item)}>
                        Edit
                    </button>
                </>
            )}
            <button className="delete-button" onClick={() => props.deleteProduct(item.product_id)}>Delete</button>
        </div>
    )
}