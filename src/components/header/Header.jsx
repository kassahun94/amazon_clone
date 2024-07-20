"use client";

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FiSearch, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

function Header() {
	return (
		<section className="relative z-50">
			{/* Top navigation */}
			<div className="flex items-center bg-amazon_blue p-2 flex-grow py-2">
				<div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
					<Link to="/">
						<img
							src="https://links.papareact.com/f90"
							alt="Amazon Logo"
							width={150}
							height={40}
							style={{ objectFit: "contain" }}
							className="link cursor-pointer"
						/>
					</Link>
				</div>
				{/* Search bar */}
				<div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 ml-4">
					<input
						className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
						type="text"
						placeholder="Search Amazon..."
					/>
					<div className="h-12 p-4 flex items-center justify-center">
						<FiSearch className="h-6 w-6" />
					</div>
				</div>
				{/* Right section */}
				<div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
					<Link to="/auth">
						<div className="link">
							<p>Hello, Sign in</p>
							<p className="font-extrabold md:text-sm">Account & Lists</p>
						</div>
					</Link>
					<Link to="/orders">
						<div className="link">
							<p>Returns</p>
							<p className="font-extrabold md:text-sm">& Orders</p>
						</div>
					</Link>
					<Link to="/cart">
						<div className="relative flex items-center link">
							<span className="absolute top-2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
								0
							</span>
							<HiOutlineShoppingCart className="h-10 w-10" />
							<p className="hidden md:inline font-extrabold md:text-sm mt-2">
								Cart
							</p>
						</div>
					</Link>
				</div>
			</div>
			{/* Bottom navigation */}
			<div>
				<div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
					<p className="link flex items-center">
						<FiMenu className="h-6 mr-1" />
						All
					</p>
					<p className="link">Prime Video</p>
					<p className="link">Amazon Business</p>
					<p className="link">Today&apos;s Deals</p>
					<p className="link hidden lg:inline-flex">Electronics</p>
					<p className="link hidden lg:inline-flex">Food & Grocery</p>
					<p className="link hidden lg:inline-flex">Prime</p>
					<p className="link hidden lg:inline-flex">Buy Again</p>
					<p className="link hidden lg:inline-flex">Shopper Toolkit</p>
					<p className="link hidden lg:inline-flex">Health & Personal Care</p>
				</div>
			</div>
		</section>
	);
}

export default Header;
