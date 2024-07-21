
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/endpoint"
import ProductCard from "../../components/product/ProductCard";
import LayOut from "../../components/layOut/LayOut";
import Loader from "../../components/loader/Loader";

function ProductDetail() {
	const [productId] = useParams();
	const [isLoading, setLoading] = useState(false);
	const [product, setProduct] = useState({});

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${productUrl}/products${productId}`)
			.then((res) => {
				setProduct(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
				setLoading(false);
			});
	}, [productId]);

	if (!product) return <p>Loading...</p>;
	
	return (
		<LayOut>
			{isLoading ? <Loader /> : ( < ProductCard product={product} /> )}
			
		</LayOut>
	);
}

export default ProductDetail;
