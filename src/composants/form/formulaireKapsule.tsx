"use client";

import type { ReactElement } from "react";
import Formulaire from "./formulaire.tsx";
import { AppFormKapsule } from "./sectionFormKapsule/appFormKapsule.tsx";
import { DetailFormKapsule } from "./sectionFormKapsule/detailFormKapsule.tsx";
import { TagFormKapsule } from "./sectionFormKapsule/tagFormKapsule.tsx";
import { useFormKapsule } from "../../hooks/kapsule/useFormKapsule.ts";
import { useApplications } from "../../hooks/application/useApplications.ts";
import { useTranslation } from "react-i18next";

export default function FormulaireKapsule(): ReactElement {
	const { t } = useTranslation();
	const { applications } = useApplications();
	const {
		formKapsule,
		currentTag,
		setCurrentTag,
		currentApp,
		currentOption,
		setCurrentOption,
		loadingKapsule,
		errorKapsule,
		successMessage,
		handleChange,
		handleAddTag,
		handleRemoveTag,
		handleSelectAppChange,
		handleAddAppAndOption,
		handleRemoveApp,
		handleSubmit,
	} = useFormKapsule(applications);

	return (
		<Formulaire onSubmit={handleSubmit}>
			<div className="w-full flex justify-center">
				<div className="flex flex-col w-full gap-4 max-w-xl">
					{/* Détails de base */}
					<DetailFormKapsule
						formKapsule={formKapsule}
						handleChange={handleChange}
					/>

					{/* Section Tags */}
					<TagFormKapsule
						currentTag={currentTag}
						setCurrentTag={setCurrentTag}
						handleAddTag={handleAddTag}
						handleRemoveTag={(tag) => {
							const index = formKapsule.tag.indexOf(tag);
							if (index !== -1) handleRemoveTag(index);
						}}
						formKapsule={formKapsule}
					/>

					{/* Section Applications & Options */}
					<AppFormKapsule
						currentApp={currentApp}
						currentOption={currentOption}
						handleAddAppAndOption={handleAddAppAndOption}
						handleRemoveApp={handleRemoveApp as () => void}
						formKapsule={formKapsule}
						setCurrentOption={setCurrentOption}
						handleSelectAppChange={handleSelectAppChange}
						applications={applications.map((application) => ({
							...application,
							id: String(application.id),
						}))}
					/>
				</div>
			</div>
			<div className="flex justify-center mt-6">
				<button
					className="bg-blue-900 box-border border border-transparent 
								hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium 
								shadow-xs font-bold leading-5 rounded-full text-sm 
								px-4 py-2.5 focus:outline-none text-white hover:bg-blue-800"
					type="submit"
				>
					{loadingKapsule
						? t("Formulaire.loading")
						: t("Formulaire.creer")}
				</button>
			</div>
			{errorKapsule && (
				<p className="mt-4 w-full text-center text-red-500">
					{errorKapsule}
				</p>
			)}

			{successMessage && (
				<p className="mt-4 w-full text-center text-green-600 font-medium">
					{successMessage}
				</p>
			)}
		</Formulaire>
	);
}
