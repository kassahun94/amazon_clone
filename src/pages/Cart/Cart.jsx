import { useContext, useEffect } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Link } from "react-router-dom";
import LayOut from "../../components/layOut/LayOut";

function Cart() {
	const [{ cart }, dispatch] = useContext(DataContext);

	useEffect(() => {
	}, [cart]);

	const incrementItem = (id) => {
		dispatch({ type: "INCREMENT_ITEM", payload: id });
	};

	const decrementItem = (id) => {
		dispatch({ type: "DECREMENT_ITEM", payload: id });
	};

	const removeItem = (id) => {
		dispatch({ type: "REMOVE_ITEM", payload: id });
	};

	const subtotal = cart
		.reduce((acc, item) => acc + item.price * item.amount, 0)
		.toFixed(2);

	const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);

	// Calculate delivery fee
	const hasPrimeItem = cart.some((item) => item.prime);
	const deliveryFee = hasPrimeItem ? 0 : 6.99;


	const totalWithDelivery = (parseFloat(subtotal) + deliveryFee).toFixed(2);

	return (
		<LayOut>
			<section className="flex flex-col md:flex-row gap-5 w-full mx-auto max-w-full">
				{/* Cart Items Display */}
				<div className="flex-grow p-5 w-full md:max-w-[70%] mx-auto">
					<h2 className="py-5 text-xl italic font-bold">Hello</h2>
					<h3 className="py-5 italic underline text-lg">Your Cart</h3>
					<div>
						{cart.length === 0 ? (
							<p className="text-center text-gray-500">Cart is empty</p>
						) : (
							cart.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-5 p-5 border-b border-gray-200"
								>
									<img
										src={item.image}
										alt={item.title}
										className="w-24 h-24 object-contain"
									/>
									<div className="flex flex-col flex-grow">
										<h3 className="font-bold text-lg">{item.title}</h3>
										<p className="italic text-gray-600">{item.description}</p>
										{item.prime && (
											<div className="flex items-center">
												<img
													loading="lazy"
													src="/prime.png"
													alt="Prime"
													className="w-12"
													style={{ height: "48px", width: "48px" }}
												/>
												<p className="text-sm text-green-500 ml-2">
													Free Delivery
												</p>
											</div>
										)}
									</div>
									<div className="flex items-center gap-2">
										<button
											onClick={() => incrementItem(item.id)}
											className="p-2 bg-gray-200 rounded hover:bg-yellow-500"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 15l7-7 7 7"
												/>
											</svg>
										</button>
										<p>{item.amount}</p>
										<button
											onClick={() => decrementItem(item.id)}
											className="p-2 bg-gray-200 rounded hover:bg-yellow-500"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>
										<button
											onClick={() => removeItem(item.id)}
											className="text-red-500 font-semibold"
										>
											Remove
										</button>
									</div>
								</div>
							))
						)}
					</div>
				</div>
				{/* Subtotal and Checkout */}
				<div className="w-full md:w-auto md:max-w-[30%] md:sticky md:top-5 p-5 border border-gray-300 bg-gray-100 rounded-md">
					{cart.length > 0 && (
						<div className="flex flex-col items-center gap-5">
							<div className="text-center w-full">
								<p className="text-lg font-semibold">
									Subtotal ({totalItems} {totalItems > 1 ? "items" : "item"})
								</p>
								<p className="text-xl font-bold">${subtotal}</p>
							</div>
							<div className="mt-5 w-full">
								<Link
									to="/payments"
									className="block w-full bg-yellow-500 rounded-md py-2 px-4 text-black font-semibold text-center hover:bg-yellow-400"
								>
									Continue to Checkout
								</Link>
							</div>
						</div>
					)}
					{/* Cart Summary */}
					<div className="mt-5">
						<h3 className="py-5 text-lg">Cart Summary</h3>
						<div className="flex flex-col gap-5 p-5 border border-gray-300 bg-gray-100 rounded-md">
							<div className="flex justify-between">
								<p>Subtotal ({totalItems} items)</p>
								<p>${subtotal}</p>
							</div>
							<div className="flex justify-between">
								<p>Shipping</p>
								<p>${deliveryFee === 0 ? "Free" : deliveryFee.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p>Total</p>
								<p>${totalWithDelivery}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Cart;
