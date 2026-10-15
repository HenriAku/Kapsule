"use client";

import { NavLink } from "react-router-dom";

export const ItemNavBar = ({
	name,
	icon,
	link,
}: {
	name: string;
	icon: string;
	link: string;
}) => {
	return (
		<li>
			<NavLink to={link} className="flex items-center justify-center md:justify-start a_nav">
				{({ isActive }) => (
					<>
						<div
							className={`w-7 h-7 mr-2 shrink-0 transition-colors ${
								isActive ? "bg-blue-300" : "bg-white"
							}`}
							style={{
								maskImage: `url(${icon})`,
								maskSize: "contain",
								maskRepeat: "no-repeat",
								maskPosition: "center",
								WebkitMaskImage: `url(${icon})`,
								WebkitMaskSize: "contain",
								WebkitMaskRepeat: "no-repeat",
								WebkitMaskPosition: "center",
							}}
						/>
						<span
							className={`hidden md:inline sm:text-sm md:text-base lg:text-lg text-sm ${
								isActive
									? "underline underline-offset-4 decoration-2"
									: ""
							}`}
						>
							{name}
						</span>
					</>
				)}
			</NavLink>
		</li>
	);
};
