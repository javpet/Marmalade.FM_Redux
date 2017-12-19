import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="black mb4 pt5">
			<h1 className="ttu f3 tracked-mega anton tc mt0 mb3">
				<NavLink className="link black" to="/">
					Marmalade.fm
				</NavLink>
			</h1>
			<ul className="flex list justify-center pl0">
				<li className="mh2">
					<NavLink exact to="/" className="nav-link link black biryani-black f6 ttu gray">
						What's hot
					</NavLink>
				</li>
				<li className="mh2">
					<NavLink to="/archive" className="nav-link link black biryani-black f6 ttu gray">
						Archive
					</NavLink>
				</li>
				<li className="mh2">
					<NavLink to="/about" className="nav-link link black biryani-black f6 ttu gray">
						About
					</NavLink>
				</li>
			</ul>
		</header>
	);
};

export default Header;
