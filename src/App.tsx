import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./composants/essentiel/navBar";
import Kapsules from "./composants/sections/kapsule";
import Dashboard from "./composants/sections/dashboard";
import FormKapsule from "./composants/sections/formKapsule";
import Setting from "./composants/sections/setting";
import { verifierMiseAJour } from "./update/verifierMiseAJour";
import { useEffect } from "react";

export default function App() {
	useEffect(() => {
		verifierMiseAJour();
	}, []);
	
	return (
		<div className="min-h-screen bg-[#171633] dark:bg-[#0F0E26] text-slate-100">
			<HashRouter>
				<div className="flex">
					<Navbar />
					<main className="flex-1">
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/kapsule" element={<Kapsules />} />
							<Route path="/new-kapsule" element={<FormKapsule />}/>
							<Route path="/settings" element={<Setting />} />
						</Routes>
					</main>
				</div>
			</HashRouter>
		</div>
	);
}
