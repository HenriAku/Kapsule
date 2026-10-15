import { KapsulesSection } from "../kapsule/kapsulesSection";
import { Conteneur } from "../essentiel/conteneur";

export default function Dashboard() {
	return (
		<Conteneur>
			{/* Kapsules Main Section */}
			<KapsulesSection grid={2} />

			{/* Agenda 
			<div className="flex flex-col p-2 sm:p-6 w-full lg:w-1/2 mt-4 lg:mt-0 bg_gris rounded-r-3xl sm:rounded-r-4xl">
				<SousTitre sousTitre="Agenda" />
			</div>*/}
		</Conteneur>
	);
}
