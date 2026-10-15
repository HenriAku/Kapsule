import { TitreSection } from "../essentiel/titreSection";
import { useTranslation } from "react-i18next";
import SelectLangue from "../setting/selectLangue";
import ButtonTheme from "../setting/buttonTheme";
import { Conteneur } from "../essentiel/conteneur";

export default function Setting() {
	const { t } = useTranslation();

	return (
		<Conteneur>
			<div className="flex flex-col p-2 sm:p-6 w-full">
				<TitreSection titre={t("Setting.titre")} />
				<div className="flex flex-col gap-4 mt-4 ml-0 sm:ml-4">
					<SelectLangue />
					<ButtonTheme />
				</div>
			</div>
		</Conteneur>
	);
}
