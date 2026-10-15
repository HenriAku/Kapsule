import { Kapsule as KapsuleType } from "../../service/kapsuleService";
import Formulaire from "../form/formulaire.tsx";
import { DetailFormKapsule } from "../form/sectionFormKapsule/detailFormKapsule.tsx";
import { useFormKapsule } from "../../hooks/kapsule/useFormKapsule.ts";
import { useApplications } from "../../hooks/application/useApplications.ts";
import { useTranslation } from "react-i18next";
import { TitreSection } from "../essentiel/titreSection.tsx";
import { useEffect } from "react";
import { TagFormKapsule } from "../form/sectionFormKapsule/tagFormKapsule.tsx";
import { AppFormKapsule } from "../form/sectionFormKapsule/appFormKapsule.tsx";

export const ModalEdit = ({
	kapsule,
	isOpen,
	onClose,
	onRefresh,
}: {
	kapsule: KapsuleType;
	isOpen: boolean;
	onClose: () => void;
	onRefresh: () => void;
}) => {
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
		success,
		handleChange,
		handleAddTag,
		handleRemoveTag,
		handleSelectAppChange,
		handleAddAppAndOption,
		handleRemoveApp,
		handleSubmit,
	} = useFormKapsule(applications, kapsule);

	useEffect(() => {
		if (success) {
			onClose();
			if (success && onRefresh) {
				onRefresh();
			}
		}
	}, [success, onClose, onRefresh]);

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs ${isOpen ? "" : "hidden"}`}
		>
			<div
				className="bg-white dark:bg-gray-900 rounded-2xl p-6 z-10 shadow-2xl shadow-black/50 border
					border-gray-200 dark:border-gray-800 max-w-lg w-full mx-4 overflow-y-auto h-200"
			>
				<TitreSection titre={t("ModalEdit.titreEdit")} />
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
								applications={applications.map(
									(application) => ({
										...application,
										id: String(application.id),
									}),
								)}
							/>
						</div>
					</div>
					<div className="mt-6 flex justify-center space-x-3">
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
								rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
								focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
							onClick={onClose}
						>
							{t("ModalEdit.btnAnnuler")}
						</button>

						<button
							className="bg-blue-900 box-border border border-transparent 
									hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium 
									shadow-xs font-bold leading-5 rounded-full text-sm 
									px-4 py-2.5 focus:outline-none text-white hover:bg-blue-800"
							type="submit"
						>
							{loadingKapsule
								? t("Formulaire.loading")
								: t("ModalEdit.btnEditer")}
						</button>
					</div>
					{errorKapsule && (
						<p className="mt-4 w-full text-center text-red-500">
							{errorKapsule}
						</p>
					)}
				</Formulaire>
			</div>
		</div>
	);
};
