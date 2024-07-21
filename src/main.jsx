import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import DataProvider from "./components/DataProvider/DataProvider.jsx";
import { initialState, Reducer } from "./utils/Reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<DataProvider reducer={Reducer} initialState={initialState}>
			<App />
		</DataProvider>
	</Router>
);
