import { Routes, Route } from "react-router-dom";
import Landing from "./src/pages/landing_page/Landing";
import SignIn from "./src/pages/Auth/SignIn";
import Payment from "./src/pages/Payment/Payment";
import Orders from "./src/pages/Orders/Orders";
import Cart from "./src/pages/Cart/Cart";
import Results from "./src/pages/Results/Result";

function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/auth" element={<SignIn />} />
			<Route path="/payment" element={<Payment />} />
			<Route path="/orders" element={<Orders />} />
			<Route path="/categories/:categoriesName" element={<Results />} />
			<Route path="/cart" element={<Cart />} />
		</Routes>
	);
}

export default Routing;
