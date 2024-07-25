import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import PropTypes from "prop-types";


const ProtectedRoute = ({ children, msg, redirect }) => {
	const navigate = useNavigate();
	const [{ user }] = useContext(DataContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!user) {
			navigate("/auth", { state: { msg, redirect } });
		} else {
			setIsLoading(false);
		}
	}, [user, navigate, msg, redirect]);

	if (isLoading) {
		// Optionally, render a loading spinner or nothing while checking auth status
		return <div>Loading...</div>;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
	msg: PropTypes.string,
	redirect: PropTypes.string,
};

export default ProtectedRoute;
