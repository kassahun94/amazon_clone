import { Routes, Route } from "react-router-dom";
import Landing from "./src/pages/landing_page/Landing";
import Auth from "./src/pages/Auth/Auth";
import Payment from "./src/pages/Payment/Payment";
import Orders from "./src/pages/Orders/Orders";
import Cart from "./src/pages/Cart/Cart";
import Results from "./src/pages/Results/Result";
import ProductDetails from "./src/pages/ProductDetails/ProductDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./src/components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe("pk_test_eZnTO11YuonipZgrLJvGbkqD00eLDZFgVX");



function Routing() {

	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/auth" element={<Auth />} />
			<Route
				path="/payment"
				element={
					<ProtectedRoute
						msg={"you must sign before making payment"}
						redirect={"/payment"}
					>
						<Elements stripe={stripePromise}>
							<Payment />
						</Elements>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/orders"
				element={
					<ProtectedRoute
						msg={"you must sign before viewing orders"}
						redirect={"/orders"}
					>
						<Elements stripe={stripePromise}>
							<Orders />
						</Elements>
					</ProtectedRoute>
				}
			/>
			<Route path="/categories/:categoryName" element={<Results />} />
			<Route path="/products/:productId" element={<ProductDetails />} />
			<Route path="/cart" element={<Cart />} />
		</Routes>
	);
}

export default Routing;
