"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ButtonTheme() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const { t } = useTranslation();

	// Évite les erreurs d'hydratation au rendu initial
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex items-center gap-2">
			<label htmlFor="theme-toggle" className="text-black dark:text-white">
				{t("Setting.descriptionTheme")}
			</label>
			<button
				type="button"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
				className="px-4 py-2 rounded-2xl border border-blue-900 bg-white
						dark:bg-slate-800 text-black dark:text-white font-medium transition-colors"
				>
				{theme === "dark" ? t("Setting.textBtnThememode1") : t("Setting.textBtnThememode2")}
			</button>
		</div>
	);
}