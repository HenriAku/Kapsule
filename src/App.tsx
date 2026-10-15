import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./composants/essentiel/navBar";
import Kapsules from "./composants/sections/kapsule";
import Dashboard from "./composants/sections/dashboard";
import FormKapsule from "./composants/sections/formKapsule";
import Setting from "./composants/sections/setting";
import { verifierMiseAJour } from "./update/verifierMiseAJour";
import { useEffect, useState } from "react";
import { relaunch } from "@tauri-apps/plugin-process";

export default function App() {
	const [updateInfo, setUpdateInfo] = useState<{
		version: string;
		updateObj: any;
	} | null>(null);
	const [updating, setUpdating] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		verifierMiseAJour()
			.then((res) => {
				if (res.available) {
					setUpdateInfo({
						version: res.version ?? "inconnue",
						updateObj: res.updateObject,
					});
				}
			})
			.catch((err) => {
				setErrorMsg(err?.message || String(err));
			});
	}, []);

	const handleInstall = async () => {
		if (!updateInfo) return;
		try {
			setUpdating(true);
			await updateInfo.updateObj.downloadAndInstall();
			await relaunch();
		} catch (err: any) {
			setErrorMsg(
				"Erreur lors de l'installation : " +
					(err?.message || String(err)),
			);
			setUpdating(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#171633] dark:bg-[#0F0E26] text-slate-100 relative">
			{/* Modale de mise à jour */}
			{updateInfo && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<div className="bg-[#1e1c45] p-6 rounded-lg max-w-md w-full border border-slate-700 shadow-xl">
						<h3 className="text-xl font-bold mb-2">
							Mise à jour disponible !
						</h3>
						<p className="text-slate-300 mb-4">
							Une nouvelle version ({updateInfo.version}) est
							disponible. Voulez-vous l'installer maintenant ?
						</p>
						{updating ? (
							<p className="text-blue-400 font-medium">
								Téléchargement et installation en cours...
							</p>
						) : (
							<div className="flex justify-end gap-3">
								<button
									onClick={() => setUpdateInfo(null)}
									className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm"
								>
									Plus tard
								</button>
								<button
									onClick={handleInstall}
									className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium"
								>
									Installer et redémarrer
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Modale d'erreur */}
			{errorMsg && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
					<div className="bg-[#1e1c45] p-6 rounded-lg max-w-md w-full border border-red-500/50 shadow-xl">
						<h3 className="text-xl font-bold mb-2 text-red-400">
							Erreur de mise à jour
						</h3>
						<p className="text-slate-300 mb-4 text-sm bg-black/30 p-3 rounded font-mono">
							{errorMsg}
						</p>
						<div className="flex justify-end">
							<button
								onClick={() => setErrorMsg(null)}
								className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm"
							>
								Fermer
							</button>
						</div>
					</div>
				</div>
			)}

			<HashRouter>
				<div className="flex">
					<Navbar />
					<main className="flex-1">
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/kapsule" element={<Kapsules />} />
							<Route
								path="/new-kapsule"
								element={<FormKapsule />}
							/>
							<Route path="/settings" element={<Setting />} />
						</Routes>
					</main>
				</div>
			</HashRouter>
		</div>
	);
}
