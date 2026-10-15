import { KapsulesSection } from "../kapsule/kapsulesSection";
import { Conteneur } from "../essentiel/conteneur";

export default function Kapsules() {
	return (
		<Conteneur>
			<KapsulesSection grid={3} />
		</Conteneur>
	);
}
