import { useKapsules } from "../../hooks/kapsule/useKapsules";
import { TitreSection } from "../essentiel/titreSection";
import { SousTitre } from "../essentiel/sousTitre";
import { Kapsule } from "./kapsule";
import { useTagList } from "../../hooks/kapsule/useTagList";
import { useFiltre } from "../../hooks/kapsule/useFiltre";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const KapsulesSection = ({ grid }: { grid: number }) => {
	const { t } = useTranslation();
	const { kapsules, refetch } = useKapsules();
	const { tagList } = useTagList(kapsules);
	const recentKapsule = kapsules.find(
		(kapsule) => kapsule.activation === true,
	);
	const {setSelectedOption, kapsulesFiltrees } = useFiltre(kapsules);

	return (
		<div className="flex flex-col p-2 sm:p-6 w-full">
			<TitreSection
				titre={grid === 3 ? t("Kapsule.titre2") : t("Kapsule.titre1")}
			/>

			{recentKapsule === undefined ? (
				<p></p>
			) : (
				<div className="w-full">
					<SousTitre sousTitre={t("Kapsule.sousTitre1")} />
					<Kapsule
						Kapsule={recentKapsule}
						seule={true}
						onRefresh={() => refetch()}
					/>
				</div>
			)}

			<div className="flex flex-col mt-8 sm:mt-10 w-full">
				<div className="flex flex-row items-center mb-4">
					<SousTitre sousTitre={t("Kapsule.sousTitre2")} />
					<div className="pt-7 pl-5 text-black dark:text-white text-lg flex flex-row items-center gap-5">
						<label>{t("Kapsule.filtrer")} </label>
						<select
							id="filtre"
							name="filtre"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
								focus:ring-blue-500 focus:border-blue-500 block p-2"
							onChange={(e) => setSelectedOption(e.target.value)}
						>
							<option value="Tout">{t("Kapsule.options")}</option>
							<option value="Fav">Fav</option>
							{tagList.map((tag) => (
								<option className="filtre" value={tag}>
									{tag}
								</option>
							))}
						</select>
					</div>
					{grid === 2 && (
						<Link
							to="/kapsule"
							className="pt-7 pl-5 text-black dark:text-white text-lg flex flex-row items-center gap-5"
						>
							{t("Kapsule.voirPlus")}
						</Link>
					)}
				</div>
				<div
					className={`grid grid-cols-1 ${grid === 2 ? "xl:grid-cols-2 lg:grid-cols-2" : "xl:grid-cols-3 lg:grid-cols-2"} w-full`}
				>
					{Array.from({ length: kapsulesFiltrees.length }, (_, i) => (
						<Kapsule
							Kapsule={kapsulesFiltrees[i]}
							seule={false}
							onRefresh={() => refetch()}
							key={kapsulesFiltrees[i].id}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
