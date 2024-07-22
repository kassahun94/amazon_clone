import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

function Product() {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:mt-6">
					{products.slice(0, 4).map((product) => (
						<div key={product.id}>
							<Link to={`/products/${product.id}`}>
								<ProductCard product={product} renderAdd={true} />
							</Link>
						</div>
					))}

					<div className="md:col-span-full mx-auto">
						<img
							src="https://links.papareact.com/dyz"
							width={1530}
							height={300}
							alt="Prime Day Banner"
							className="object-cover w-full h-64 md:h-72 lg:h-80 xl:h-96"
						/>
					</div>

					{products.slice(4, 5).map((product) => (
						<div key={product.id} className="md:col-span-2">
							<Link to={`/products/${product.id}`}>
								<ProductCard product={product} renderAdd={true} />
							</Link>
						</div>
					))}

					{products.slice(5).map((product) => (
						<div key={product.id}>
							<Link to={`/products/${product.id}`}>
								<ProductCard product={product} renderAdd={true} />
							</Link>
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Product;
