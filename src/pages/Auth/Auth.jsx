import { Link } from "react-router-dom";


function Auth() {
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
					<form>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
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
								type="password"
								id="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Sign In
						</button>
					</form>
					<p className="mt-4 text-sm text-gray-600">
						By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
						Sale. Please see our Privacy Notice, our Cookies Notice and our
						Interest-Based Ads Notice.
					</p>
					<button className="mt-4 w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2">
						Create your Amazon Account
					</button>
				</div>
			</div>
		</section>
	);
}

export default Auth;
