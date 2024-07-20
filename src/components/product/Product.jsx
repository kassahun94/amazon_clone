import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

function Product() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				const productsWithPrime = res.data.map((product) => ({
					...product,
					hasPrime: Math.random() < 0.5,
				}));
				setProducts(productsWithPrime);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

	return (
		<div className="app">
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{products.length > 0 ? (
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<p>Loading products...</p>
				)}
			</section>
		</div>
	);
}

export default Product;
