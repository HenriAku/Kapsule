import {InputAndBtn} from "../inputAndBtn.tsx";
import ButtonRemove from "../buttonRemove.tsx";
import { ContenaireFormulaire } from "../contenaireFormulaire.tsx";
import { useTranslation } from "react-i18next";

interface FormKapsule {
	application: string[];
	option: string[];
}

interface Application {
	id: string;
	name: string;
}

interface AppFormKapsuleProps {
	currentApp: string;
	currentOption: string;
	handleAddAppAndOption: () => void;
	handleRemoveApp: () => void;
	formKapsule: FormKapsule;
	setCurrentOption: (option: string) => void;
	handleSelectAppChange: (app: string) => void;
	applications: Application[];
}

export const AppFormKapsule = ({
	currentApp,
	currentOption,
	handleAddAppAndOption,
	handleRemoveApp,
	formKapsule,
	setCurrentOption,
	handleSelectAppChange,
	applications
}: AppFormKapsuleProps) => {
	const { t } = useTranslation();

	return (
		<ContenaireFormulaire text={t("Formulaire.applicationsOptions")}>
			<label
				htmlFor="application"
				className="block font-medium text-black dark:text-white"
			>
				<span className="text-red-500">*</span> Application :
			</label>
			<select
				id="application"
				className="border rounded-xl border-blue-900 hover:border-blue-800 w-full px-3 py-2 dark:bg-white text-black"
				value={currentApp}
				onChange={(e) =>
					handleSelectAppChange(e.target.value)
				}
			>
				<option value="">
					{t("Formulaire.selectionnerApp")}
				</option>
				{applications?.map((app) => (
					<option key={app.id} value={app.name}>
						{app.name}
					</option>
				))}
			</select>

			<InputAndBtn
				labelInput={t("Formulaire.ajouterOption")}
				type="text"
				nameInput="option"
				valueInput={currentOption}
				placeholderInput={t("Formulaire.placeholderOption")}
				onChangeInput={(e) => setCurrentOption(e.target.value)}
				disabledInput={false}
				requiredInput={false}
				onClickBtn={handleAddAppAndOption}
				textBtn={t("Formulaire.btnAjouterTag")}
			/>

			{/* Affichage des applications ajoutées en dessous */}
			<div className="flex flex-col gap-2 mt-3">
				{formKapsule.application.map((app, index) => (
					<div
						key={index}
						className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-xl text-sm"
					>
						<div>
							<p className="font-semibold text-black dark:text-white">
								{app}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-300">
								Opt: {formKapsule.option[index]}
							</p>
						</div>
						<ButtonRemove
							onClick={handleRemoveApp}
							index={index}
						/>
					</div>
				))}
			</div>
		</ContenaireFormulaire>
	);
};