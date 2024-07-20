import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../components/layOut/LayOut";
import ProductCard from "../../components/product/ProductCard";
import { productUrl } from "../../Api/endpoint";

function Result() {
	const { categoriesName } = useParams();
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios
			.get(`${productUrl}/category/${encodeURIComponent(categoriesName)}`)
			.then((res) => {
				setResults(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [categoriesName]);

	return (
		<LayOut>
			<section className="p-8">
				<h1 className="text-3xl font-bold mb-8">Results</h1>
				<p className="text-xl mb-8">Category: {categoriesName}</p>
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
		</LayOut>
	);
}

export default Result;
