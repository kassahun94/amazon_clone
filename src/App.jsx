import { useEffect, useContext } from "react";
import Routing from "../Router";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./utils/fireBase";
import { Type } from "./utils/ActionType";

function App() {
	const [, dispatch] = useContext(DataContext);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: Type.SET_USER,
					user: authUser,
				});
			} else {
				dispatch({
					type: Type.SET_USER,
					user: null,
				});
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	return <Routing />;
}

export default App;
