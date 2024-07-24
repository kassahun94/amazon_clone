import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utils/fireBase";
import { useState, useContext } from "react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import {CircleLoader} from "react-spinners";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

	const [, dispatch] = useContext(DataContext);
	const navigate = useNavigate();	
	const navStateData = useLocation();

	const AuthHandler = (e) => {
		e.preventDefault();
            // sign in section
		if (e.target.name === "signin") {
      setLoading({...loading, signIn: true });
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					console.log(userCredential.user);
					dispatch({
						type: "SET_USER",
						user: userCredential.user,
					});   
          setLoading({...loading, signIn: false });

					// navigate to home page or riderct to the page that user was trying to access


					navigate(navStateData?.redirect || "/");
				})
				.catch((error) => {
					if (error.code === "auth/wrong-password") {
						setError("Wrong password.");
					} else if (error.code === "auth/user-not-found") {
						setError("No user found with this email.");
					} else {
						setError(error.message);
            setLoading({...loading, signIn: false });
					}
				});
				// create account section
		} else {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
          setLoading({...loading, signUp: true });
					dispatch({
						type: "SET_USER",
						user: userCredential.user,
					});
          setLoading({...loading, signUp: false });
					navigate(navStateData?.redirect || "/");
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use") {
						setError("Email already in use.");
					} else if (error.code === "auth/invalid-email") {
						setError("Invalid email.");
					} else if (error.code === "auth/weak-password") {
						setError("Weak password.");
					} else {
						setError(error.message);
            setLoading({...loading, signUp: false });
						
					}
				});
		}
	};

	return (
		<section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
			<div className="mb-8">
				<Link to="/">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
						alt="amazon logo"
						className="m-auto object-contain w-32"
					/>
				</Link>
			</div>
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
				<div>
					<h1 className="text-3xl font-semibold mb-4">Sign In</h1>
					{
						navStateData?.state?.msg && (
							<small className="mb-4 p-2 align-item-center font-weight-bold text-red-700">
								{navStateData?.state?.msg}
							</small>
						)
					}
					<form>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								id="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								id="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						{error && <div className="mb-4 text-red-700">{error}</div>}
						<button
							type="submit"
							name="signin"
							onClick={AuthHandler}
							className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							{loading.signIn ? (
								<CircleLoader color="#5bec16" size={20} />
							) : (
								"Sign In"
							)}
						</button>
					</form>
					<p className="mt-4 text-sm text-gray-600">
						By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
						Sale. Please see our Privacy Notice, our Cookies Notice and our
						Interest-Based Ads Notice.
					</p>
					<button
						type="submit"
						name="signUp"
						onClick={AuthHandler}
						className="mt-4 w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
					>
            {loading.signUp ?(
              <CircleLoader color="#5bec16" size={20} />
            ) : (
              "Create your Amazon Account"
            
            )}
					</button>
				</div>
			</div>
		</section>
	);
}

export default Auth;
