import { useEffect, useState, useContext } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import Layout from "../../components/layOut/LayOut";
import { db } from "../../utils/fireBase";
import Rating from "@mui/material/Rating";
import { DataContext } from "../../components/DataProvider/DataProvider";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [{ user }] = useContext(DataContext);

	useEffect(() => {
		if (user) {
			const userOrdersRef = collection(db, "users", user.uid, "orders");
			const q = query(userOrdersRef, orderBy("created", "desc"));

			const unsubscribe = onSnapshot(q, (snapshot) => {
				setOrders(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});

			return () => unsubscribe();
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<Layout>
			<section className="bg-gray-200 p-5 text-center">
				<div className="flex justify-center items-center gap-4 mb-4">
					<h2 className="text-2xl border-b-2 border-yellow-500 pb-4">
						Your Orders
					</h2>
				</div>
				<div className="max-w-4xl mx-auto">
					{orders?.map((eachOrder, i) => {
						const totalPrice = eachOrder?.data?.cart
							?.reduce((total, item) => total + item.price, 0)
							.toFixed(2);

						// Convert Firestore Timestamp to Date
						const orderDate = eachOrder?.data?.created?.toDate
							? eachOrder?.data?.created.toDate()
							: new Date(eachOrder?.data?.created * 1000);

						return (
							<div
								key={i}
								className={`p-5 bg-white border rounded-lg mb-4 ${
									i > 0 && orders[i - 1].id === eachOrder.id ? "" : "border-t"
								}`}
							>
								{i === 0 || orders[i - 1].id !== eachOrder.id ? (
									<hr className="mb-4" />
								) : null}
								<div className="flex flex-col mb-4">
									<div className="flex justify-between items-center mb-2">
										<p
											className="text-sm font-bold"
											style={{ fontSize: "16px" }}
										>
											Order ID: {eachOrder?.id}
										</p>
										<p
											className="text-lg font-bold"
											style={{ fontSize: "16px" }}
										>
											Total: ${totalPrice}
										</p>
									</div>
									<div className="text-sm text-gray-500 mb-2">
										<span>
											Order Date:{" "}
											{orderDate ? orderDate.toLocaleDateString() : "N/A"}
										</span>
									</div>
								</div>
								<div className="flex flex-col gap-4">
									{eachOrder?.data?.cart?.map((item, index) => (
										<div
											key={index}
											className="flex items-start gap-4 p-3 border rounded-lg bg-white"
										>
											<div className="w-36 h-36 overflow-hidden flex-shrink-0">
												<img
													src={item.image}
													alt={item.title}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex flex-col flex-grow items-center text-center">
												<h4
													className="font-bold text-lg mb-1"
													style={{ fontSize: "14px" }}
												>
													{item.title}
												</h4>
												<div className="flex flex-col items-center mb-2">
													<Rating
														className="text-yellow-500"
														value={item.rating.rate}
														precision={0.1}
														readOnly
													/>
													<small className="mt-1 cursor-default">
														{item.rating.count}
													</small>
												</div>
												<p
													className="text-lg font-bold"
													style={{ fontSize: "16px" }}
												>
													${item.price.toFixed(2)}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

export default Orders;
