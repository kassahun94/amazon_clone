import { useContext, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import LayOut from "../../components/layOut/LayOut";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { CircleLoader } from "react-spinners";
import { db } from "../../utils/fireBase";

function Payment() {
	const [state] = useContext(DataContext);
	const cart = state.cart;
	const [cardError, setCardError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const deliveryFee = 6.99;

	const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);
	const subtotalPrice = cart
		.reduce((acc, item) => acc + parseFloat(item.price) * item.amount, 0)
		.toFixed(2);

	const taxAmount = (parseFloat(subtotalPrice) * 0.06).toFixed(2);

	const totalPrice = (
		parseFloat(subtotalPrice) +
		deliveryFee +
		parseFloat(taxAmount)
	).toFixed(2);

	const handleChange = (e) => {
		setCardError(e.error ? e.error.message : null);
	};

	const handlePayment = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setProcessing(true);

		try {
			const response = await axiosInstance.post(`/payments/create`, {
				total: parseFloat(totalPrice),
			});

			const { clientSecret } = response.data;

			const { paymentIntent, error } = await stripe.confirmCardPayment(
				clientSecret,
				{
					payment_method: {
						card: elements.getElement(CardElement),
					},
				}
			);

			if (error) {
				setCardError(error.message);
			} else {
				const user = { uid: "placeholderUserId" };

				await db
					.collection("users")
					.doc(user.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						cart: cart,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setProcessing(false);
			}
		} catch (error) {
			console.log(error);
			setCardError(error.message);
			setProcessing(false);
		}
	};

	return (
		<LayOut>
			<div className="min-h-screen bg-gray-100 flex justify-center py-6">
				<div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
					<h2 className="text-2xl font-semibold mb-6">
						Checkout ({totalItems} items)
					</h2>
					<div className="flex flex-col lg:flex-row gap-6 mb-6">
						<div className="flex-1 bg-gray-50 p-6 border rounded-lg shadow-md">
							<h3 className="text-xl font-semibold mb-4">
								Review items and shipping
							</h3>
							<div className="bg-gray-100 p-4 rounded-lg">
								<p className="text-sm text-green-700 mb-4">
									Arriving Jul 29, 2024 if you order in the next 17 hours and 30
									minutes (Details)
								</p>
								{cart.map((item) => (
									<div key={item.id} className="flex mb-4">
										<img
											src={item.image}
											alt={item.title}
											className="w-20 h-20 object-cover rounded-lg"
										/>
										<div className="ml-4">
											<p className="font-semibold text-lg">{item.title}</p>
											<p className="text-gray-600">Sold by: {item.seller}</p>
											<p className="font-semibold text-gray-800">
												${item.price} & FREE Returns
											</p>
											<div className="flex space-x-4 mt-2">
												<span>Qty: {item.amount}</span>
												<button className="text-blue-600 hover:underline">
													Add gift options
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="flex-1 flex flex-col gap-6">
							<div className="bg-gray-50 p-6 border rounded-lg shadow-md">
								<h4 className="text-lg font-semibold mb-4">Order Summary</h4>
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
									<span>${taxAmount}</span>
								</div>
								<div className="flex justify-between font-semibold text-lg mb-4">
									<span>Order total:</span>
									<span>${totalPrice}</span>
								</div>
							</div>
							<div
								className="bg-gray-50 p-6 border rounded-lg shadow-md flex flex-col"
								style={{ minHeight: "300px" }}
							>
								<h3 className="text-xl font-semibold mb-4">Payment Method</h3>
								<form
									onSubmit={handlePayment}
									className="flex flex-col flex-grow"
								>
									{cardError && (
										<small className="text-red-600 mb-4">{cardError}</small>
									)}
									<CardElement
										onChange={handleChange}
										className="p-4 border rounded-lg flex-grow mb-4"
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
											className="bg-yellow-500 text-white w-full py-2 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-600"
											type="submit"
											disabled={!stripe || !elements || processing}
										>
											{processing ? (
												<div className="flex items-center justify-center">
													<CircleLoader color="#ffffff" size={20} />
													<p className="ml-2">Processing...</p>
												</div>
											) : (
												"Place your order"
											)}
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayOut>
	);
}

export default Payment;
