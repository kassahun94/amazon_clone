import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Link } from "react-router-dom";
import LayOut from "../../components/layOut/LayOut";

function Cart() {
	const [{ cart }] = useContext(DataContext);
	const [groupedCart, setGroupedCart] = useState([]);

	useEffect(() => {
		const newGroupedCart = cart.reduce((acc, item) => {
			const existingItemIndex = acc.findIndex((i) => i.id === item.id);
			if (existingItemIndex !== -1) {
				acc[existingItemIndex].amount += 1;
			} else {
				acc.push({ ...item, amount: 1 });
			}
			return acc;
		}, []);
		setGroupedCart(newGroupedCart);
	}, [cart]);

	const incrementItem = (id) => {
		setGroupedCart((prevCart) =>
			prevCart.map((item) =>
				item.id === id ? { ...item, amount: item.amount + 1 } : item
			)
		);
	};

	const decrementItem = (id) => {
		setGroupedCart((prevCart) =>
			prevCart
				.map((item) =>
					item.id === id ? { ...item, amount: item.amount - 1 } : item
				)
				.filter((item) => item.amount > 0)
		);
	};

	const removeItem = (id) => {
		setGroupedCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const subtotal = groupedCart
		.reduce((acc, item) => acc + item.price * item.amount, 0)
		.toFixed(2);
	const totalItems = groupedCart.reduce((acc, item) => acc + item.amount, 0);

	return (
		<LayOut>
			<section className="flex flex-col md:flex-row gap-5 mt-5 w-full mx-auto max-w-full">
				{/* Cart Items Display */}
				<div className="flex-grow p-5 w-full md:max-w-[70%] mx-auto">
					<h2 className="py-5 text-xl font-bold">Cart</h2>
					<h3 className="py-5 text-lg">Your Cart</h3>
					<div>
						{groupedCart.length === 0 ? (
							<p className="text-center text-gray-500">Cart is empty</p>
						) : (
							groupedCart.map((item) => (
								<div
									key={item.id}
									className="flex items-center gap-5 p-5 border-b border-gray-200"
								>
									<img
										src={item.image}
										alt={item.title}
										className="w-24 h-24 object-contain"
									/>
									<div className="flex flex-col">
										<h3 className="font-bold text-lg">{item.title}</h3>
										<p className="italic text-gray-600">{item.description}</p>
										<p className="text-lg font-semibold">
											${item.price.toFixed(2)} x {item.amount}
										</p>
									</div>
									{/* Add item or remove item */}
									<div className="flex items-center gap-2">
										<button
											onClick={() => incrementItem(item.id)}
											className="p-2 bg-gray-200 rounded hover:bg-gray-300"
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
											className="p-2 bg-gray-200 rounded hover:bg-gray-300"
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
				<section>
					{groupedCart.length > 0 && (
						<div className="p-5 w-full md:w-auto flex flex-col items-center gap-5 border border-gray-300 bg-gray-100 rounded-md sticky top-5 md:top-10 md:self-start">
							<div className="text-center">
								<p className="text-lg font-semibold">
									Subtotal ({totalItems} {totalItems > 1 ? "items" : "item"})
								</p>
								<p className="text-xl font-bold">${subtotal}</p>
							</div>
							<Link
								to="/payments"
								className="text-center w-full bg-yellow-500 rounded-md py-2 px-4 text-black font-semibold hover:bg-yellow-400"
							>
								Continue to Checkout
							</Link>
						</div>
					)}
					{/* Cart Summary */}
					<div>
						<h3 className="py-5 text-lg">Cart Summary</h3>
						<div className="flex flex-col gap-5 p-5 border border-gray-300 bg-gray-100 rounded-md">
							<div className="flex justify-between">
								<p>Subtotal ({totalItems} items)</p>
								<p>${subtotal}</p>
							</div>
							<div className="flex justify-between">
								<p>Shipping</p>
								<p>Free</p>
							</div>
							<div className="flex justify-between">
								<p>Total</p>
								<p>${subtotal}</p>
							</div>
						</div>
					</div>
				</section>
			</section>
		</LayOut>
	);
}

export default Cart;
