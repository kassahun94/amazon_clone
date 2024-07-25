import { useEffect, useState, useContext } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import Layout from "../../components/layOut/LayOut";
import { db } from "../../utils/fireBase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";

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
				<div>
					{orders?.map((eachOrder, i) => (
						<div
							key={i}
							className={`p-5 bg-white border rounded-lg mb-4 ${
								i > 0 && orders[i - 1].id === eachOrder.id ? "" : "border-t"
							}`}
						>
							<p className="text-sm mb-2">Order ID: {eachOrder?.id}</p>
							<div className="flex flex-col gap-4">
								{eachOrder?.data?.cart?.map((item, index) => (
									<ProductCard
										product={item}
										key={index}
										className="flex items-center gap-4 p-3 border rounded-lg bg-white"
										imageClass="pl-5 w-24 h-24 object-cover rounded-lg" // Added left padding and image styles
										titleClass="font-semibold text-lg"
										ratingClass="text-gray-600"
										priceClass="text-gray-800 font-semibold"
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		</Layout>
	);
}

export default Orders;
