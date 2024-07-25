// src/main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { DataProvider } from "./components/DataProvider/DataProvider.jsx"; // Import as named export

ReactDOM.createRoot(document.getElementById("root")).render(
	<Router>
		<DataProvider>
			<App />
		</DataProvider>
	</Router>
);
