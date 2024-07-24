import { useContext, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import LayOut from "../../components/layOut/LayOut";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment() {
	const [state] = useContext(DataContext);
	const cart = state.cart;
	const [cardError, setCardError] = useState(null);
	const stripe = useStripe();
	const elements = useElements();

	const deliveryFee = 6.99;

	// Calculate total items and price
	const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);
	const subtotalPrice = cart
		.reduce((acc, item) => acc + parseFloat(item.price) * item.amount, 0)
		.toFixed(2);
	const totalPrice = (parseFloat(subtotalPrice) + deliveryFee).toFixed(2);

	const handleChange = (e) => {
		e.error.message ? setCardError(e.error.message) : setCardError(null);
	};

	return (
		<LayOut>
			<div className="min-h-screen bg-gray-100 flex justify-center py-6">
				<div className="w-full max-w-5xl bg-white shadow-md rounded-md p-6">
					{/* Header */}
					<h2 className="text-2xl font-semibold mb-6">
						Checkout ({totalItems} items)
					</h2>

					{/* Flex container for Review items, Order Summary, and Payment Method */}
					<div className="flex gap-6 mb-6">
						{/* Review items and shipping */}
						<div className="flex-1 bg-gray-100 p-6 border rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">
								Review items and shipping
							</h3>
							<div className="bg-gray-100 p-4 rounded">
								<p className="text-sm text-green-700 mb-4">
									Arriving Jul 29, 2024 if you order in the next 17 hours and 30
									minutes (Details)
								</p>
								{cart.map((item) => (
									<div key={item.id} className="flex mb-4">
										<img
											src={item.image}
											alt={item.title}
											className="w-20 h-20 object-cover"
										/>
										<div className="ml-4">
											<p className="font-semibold">{item.title}</p>
											<p className="text-gray-500">Sold by: {item.seller}</p>
											<p className="font-semibold">
												${item.price} & FREE Returns
											</p>
											<div className="flex space-x-4 mt-2">
												<span>Qty: {item.amount}</span>
												<button className="text-blue-500">
													Add gift options
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Container to hold both Order Summary and Payment Method */}
						<div className="flex-1 flex flex-col gap-6">
							{/* Order Summary */}
							<div className="bg-gray-100 p-6 border rounded-lg shadow-lg">
								<h4 className="text-lg font-semibold mb-2">Order Summary</h4>
								<div className="flex justify-between mb-2">
									<span>Items ({totalItems}):</span>
									<span>${subtotalPrice}</span>
								</div>
								<div className="flex justify-between mb-2">
									<span>Shipping & handling:</span>
									<span>${deliveryFee.toFixed(2)}</span>
								</div>
								<div className="flex justify-between mb-2">
									<span>Total before tax:</span>
									<span>${subtotalPrice}</span>
								</div>
								<div className="flex justify-between mb-2">
									<span>Estimated tax to be collected:</span>
									<span>$4.62</span>
								</div>
								<div className="flex justify-between font-semibold text-lg mb-4">
									<span>Order total:</span>
									<span>${totalPrice}</span>
								</div>
							</div>

							{/* Payment Method */}
							<div
								className="bg-gray-100 p-6 border rounded-lg shadow-lg flex flex-col"
								style={{ minHeight: "300px" }} 
							>
								<div className="flex flex-col flex-grow mb-6">
									<h3 className="text-xl font-semibold mb-4">Payment Method</h3>
									<form className="flex flex-col flex-grow">
										{/* Error message */}
										{cardError && (
											<small className="text-red-500 mb-4">{cardError}</small>
										)}
										{/* Card Element */}
										<CardElement
											onChange={handleChange}
											className="p-4 border rounded flex-grow mb-4"
											options={{
												style: {
													base: {
														fontSize: "16px",
														color: "#424770",
														"::placeholder": {
															color: "#aab7c4",
														},
													},
													invalid: {
														color: "#9e2146",
													},
												},
											}}
										/>
										<div className="mt-auto">
											<button
												className="bg-yellow-500 text-white w-full py-2 rounded transition duration-300 ease-in-out border-t"
												type="submit"
												disabled={!stripe || !elements}
											>
												Place your order
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayOut>
	);
}

export default Payment;
