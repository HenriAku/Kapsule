import { TitreSection } from "../essentiel/titreSection";
import FormulaireKapsule from "../form/formulaireKapsule";
import { useTranslation } from "react-i18next";
import { Conteneur } from "../essentiel/conteneur";

export default function FormKapsule() {
	const { t } = useTranslation();

	return (
		<Conteneur>
			<div className="flex flex-col p-2 sm:p-6 w-full">
				<TitreSection titre={t("Formulaire.titre")} />
				<FormulaireKapsule />
			</div>
		</Conteneur>
	);
}
