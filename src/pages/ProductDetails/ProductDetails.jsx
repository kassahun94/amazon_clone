// ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		axios
			.get(`https://fakestoreapi.com/products/${id}`)
			.then((res) => {
				setProduct(res.data);
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
			});
	}, [id]);

	if (!product) return <p>Loading...</p>;

	return (
		<div>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
			<img src={product.image} alt={product.title} />
			<p>Price: ${product.price}</p>
		</div>
	);
}

export default ProductDetail;
