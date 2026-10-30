
import { useEffect, useState } from "react";

import {
	enable,
	disable,
	isEnabled
} from "@tauri-apps/plugin-autostart";

export default function AutostartSettings() {

	const [enabled, setEnabled] = useState(false);
	const [loading, setLoading] = useState(true);

	// Vérifier si le démarrage automatique est activé
	useEffect(() => {
		const checkAutostart = async () => {
			try {
				const status = await isEnabled();
				setEnabled(status);
			} catch (error) {
				console.error(
					"Erreur lors de la vérification :",
					error
				);
			} finally {
				setLoading(false);
			}
		};

		checkAutostart();
	}, []);

	// Activer ou désactiver le démarrage automatique
	const handleToggle = async () => {
		try {
			if (enabled) {
				await disable();
				setEnabled(false);
			} else {
				await enable();
				setEnabled(true);
			}
		} catch (error) {
			console.error(
				"Erreur Autostart :",
				error
			);
		}
	};

	return (
		<div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800">

			<div>
				<h3 className="font-semibold text-black dark:text-white">
					Démarrage automatique
				</h3>

				<p className="text-sm text-gray-500">
					Lancer Kapsule au démarrage de Windows
				</p>
			</div>

			<button
				type="button"
				onClick={handleToggle}
				disabled={loading}
				aria-label="Activer ou désactiver le démarrage automatique"
				aria-pressed={enabled}
				className={`
					relative w-12 h-6 rounded-full
					transition-colors duration-200
					${enabled ? "bg-blue-700" : "bg-gray-300"}
					disabled:opacity-50
				`}
			>
				<span
					className={`
						absolute top-1 left-1
						w-4 h-4 rounded-full bg-white
						transition-transform duration-200
						${enabled ? "translate-x-6" : "translate-x-0"}
					`}
				/>
			</button>

		</div>
	);
}
