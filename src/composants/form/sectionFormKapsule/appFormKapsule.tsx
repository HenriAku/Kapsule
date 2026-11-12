import {InputAndBtn} from "../inputAndBtn.tsx";
import ButtonRemove from "../buttonRemove.tsx";
import { ContenaireFormulaire } from "../contenaireFormulaire.tsx";
import { useTranslation } from "react-i18next";
import {InputAndBtn3} from "../inputAndBtn3.tsx";

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
	currentPathApp: string;
	handleAddAppAndOption: () => void;
	handleRemoveApp: () => void;
	formKapsule: FormKapsule;
	setCurrentOption: (option: string) => void;
	setCurrentApp: (app: string) => void;
	setCurrentPathApp: (path: string) => void;
	handleSelectAppChange: (app: string) => void;
	applications: Application[];
}

export const AppFormKapsule = ({
	currentApp,
	currentOption,
	currentPathApp,
	handleAddAppAndOption,
	handleRemoveApp,
	formKapsule,
	setCurrentOption,
	setCurrentApp,
	setCurrentPathApp,
	handleSelectAppChange,
	applications
}: AppFormKapsuleProps) => {
	const { t } = useTranslation();

	return (
		<ContenaireFormulaire text={t("Formulaire.ApplicationsOptions")}>
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

			<h3 className="text-lg font-semibold text-black dark:text-white">
				{t("Formulaire.AutreApplicationsOptions")}
			</h3>
			<InputAndBtn3
				labelInput1={t("Formulaire.LabelNameApp")}
				labelInput2={t("Formulaire.LabelPathApp")}
				labelInput3={t("Formulaire.LabelOption")}
				type="text"
				nameInput1={"app"}
				nameInput2={"pathApp"}
				nameInput3={"option"}
				valueInput1={currentApp}
				valueInput2={currentPathApp}
				valueInput3={currentOption}
				placeholderInput1={t("Formulaire.PlaceholderNameApp")}
				placeholderInput2={t("Formulaire.PlaceholderPathApp")}
				placeholderInput3={t("Formulaire.PlaceholderOption")}
				onChangeInput1={(e) => setCurrentApp(e.target.value)}
				onChangeInput2={(e) => setCurrentPathApp(e.target.value)}
				onChangeInput3={(e) => setCurrentOption(e.target.value)}
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