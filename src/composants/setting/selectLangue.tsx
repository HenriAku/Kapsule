"use client";

import { useTranslation } from "react-i18next";

export default function SelectLangue() {
	const { i18n } = useTranslation();
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-2">
			<label htmlFor="langue-select" className="text-black dark:text-white">
				{t("Setting.descriptionLangue")}
			</label>
			<select
				value={i18n.language}
				onChange={(e) => i18n.changeLanguage(e.target.value)}
				className="px-4 py-2 rounded-2xl border border-blue-900 bg-white
						dark:bg-slate-800 text-black dark:text-white font-medium transition-colors"
			>
				<option value="fr">Français</option>
				<option value="en">English</option>
			</select>
		</div>
	);
}