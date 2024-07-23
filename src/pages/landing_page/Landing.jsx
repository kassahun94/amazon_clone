import Banner from "../../components/banner/Banner";
import Catagories from "../../components/catagories/Catagories";
import Product from "../../components/product/Product";
import LayOut from "../../components/layOut/LayOut";

function Landing() {
	return (
		<LayOut>
			<Banner />
			<Catagories />
			<Product />
		</LayOut>
	);
}

export default Landing;
