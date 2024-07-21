import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../components/layOut/LayOut";
import ProductCard from "../../components/product/ProductCard";
import { productUrl } from "../../Api/endpoint";
import Loader from "../../components/loader/Loader";

function Result() {
	const { categoryName } = useParams(); 
	const [results, setResults] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`${productUrl}/products`) 
			.then((res) => {
				const filteredProducts = res.data.filter(
					(product) => product.category === categoryName 
				);
				setResults(filteredProducts);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [categoryName]);

	return (
		<LayOut>
			{isLoading ? (
				<Loader />
			) : (
				<section className="p-8">
					<h1 className="text-3xl font-bold mb-8">Results</h1>
					<p className="text-xl mb-8">Category: {categoryName}</p>
					<hr className="mb-8 border-gray-300" />
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
						{results.length > 0 ? (
							results.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
						) : (
							<p className="text-center text-xl">No products found</p>
						)}
					</div>
				</section>
			)}
		</LayOut>
	);
}

export default Result;
