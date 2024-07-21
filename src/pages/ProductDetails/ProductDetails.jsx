import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Rating from "@mui/material/Rating";

function ProductDetails() {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://fakestoreapi.com/products/${productId}`)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching product details:", error);
				setLoading(false);
			});
	}, [productId]);

	if (isLoading) return <Loader />;
	if (!product) return <p>Product not found</p>;

	return (
		<div className="max-w-lg mx-auto p-4">
			<h1 className="text-2xl font-bold text-center mb-4">{product.title}</h1>
			<img
				src={product.image}
				alt={product.title}
				className="mx-auto mb-4 w-full max-w-xs object-contain"
			/>
			<div className="flex justify-center items-center mb-4">
				<Rating value={product.rating.rate} precision={0.1} readOnly />
				<span className="ml-2 text-gray-600">({product.rating.count})</span>
			</div>
			<p className="italic mb-4">{product.description}</p>
			<p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
			{Math.random() < 0.5 && (
				<div className="flex items-center mb-4">
					<img src="/prime.png" alt="Prime" className="w-14 mr-2" />
					<p className="text-sm text-gray-500">FREE Next-day Delivery</p>
				</div>
			)}
			<button className="py-2 px-4 w-full bg-blue-500 text-white rounded-md text-center">
				Add to Cart
			</button>
		</div>
	);
}

export default ProductDetails;
