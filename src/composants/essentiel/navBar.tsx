"use client";

import { ItemNavBar } from "./itemNavBar";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
	const { t } = useTranslation();
	return (
		<div className="sm:w-15 md:w-45 lg:w-50 w-15 h-screen sticky top-0">
			<nav className="shadow-md z-50 transition-all duration-300 flex flex-col pl-5 pt-10 h-full">
				<div>
					<h1 className="text-2xl lg:text-4xl md:text-3xl font-bold hidden md:inline">
						KAPSULE
					</h1>
					<ul className="font-bold md:text-2xl space-y-7 mt-20">
						<ItemNavBar
							name={t("navBar.tableauDeBord")}
							icon="/images/dashboard.svg"
							link="/"
						/>
						<ItemNavBar
							name={t("navBar.kapsules")}
							icon="/images/box.svg"
							link="/kapsule"
						/>
						<ItemNavBar
							name={t("navBar.nouvelleKapsule")}
							icon="/images/plus.svg"
							link="/new-kapsule"
						/>
						{/*<ItemNavBar
							name={t("navBar.agenda")}
							icon="/images/calendar.svg"
							link="/agenda"
						/>8*/}
						<ItemNavBar
							name={t("navBar.parametres")}
							icon="/images/settings.svg"
							link="/settings"
						/>
					</ul>
				</div>
			</nav>
		</div>
	);
};
