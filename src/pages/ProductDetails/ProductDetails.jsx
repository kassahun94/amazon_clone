import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import Rating from "@mui/material/Rating";
import LayOut from "../../components/layOut/LayOut";
import { DataContext } from "../../components/DataProvider/DataProvider";

function ProductDetails() {
	const { productId } = useParams();
	const [, dispatch] = useContext(DataContext);
	const [product, setProduct] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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
				setError("Error fetching product details. Please try again later.");
				setLoading(false);
			});
	}, [productId]);

	const addToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			item: product,
		});
	};

	if (isLoading) return <Loader />;
	if (error) return <p>{error}</p>;
	if (!product) return <p>Product not found</p>;

	return (
		<LayOut>
			<div className="max-w-[720px] mx-auto p-4 mt-[35px]">
				<div className="flex flex-col lg:flex-row">
					<img
						src={product.image}
						alt={product.title}
						className="w-full lg:w-1/2 max-w-lg object-contain mb-4 lg:mb-0 lg:mr-8"
					/>
					<div className="flex-1">
						<h1 className="text-3xl font-bold mb-4">{product.title}</h1>
						<div className="flex items-center mb-4">
							<Rating value={product.rating.rate} precision={0.1} readOnly />
							<span className="ml-2 text-gray-600">
								({product.rating.count})
							</span>
						</div>
						<p className="italic mb-4">{product.description}</p>
						<p className="text-lg font-semibold mb-4">
							${product.price.toFixed(2)}
						</p>
						{Math.random() < 0.5 && (
							<div className="flex items-center mb-4">
								<img src="/prime.png" alt="Prime" className="w-14 mr-2" />
								<p className="text-sm text-gray-500">FREE Next-day Delivery</p>
							</div>
						)}
						<button
							className="cursor-pointer hover:border-[1px] rounded-[3px] p-2 text-xs md:text-sm bg-gradient-to-b from-yellow-200 to-yellow-500 font-bold py-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-600 focus:ring-opacity-50 transition duration-300 ease-in-out w-60 hover:bg-gradient-to-b hover:from-yellow-500 hover:to-yellow-600"
							onClick={addToCart}
						>
							Add to Cart
						</button>
					</div>
				</div>
			</div>
		</LayOut>
	);
}

export default ProductDetails;
