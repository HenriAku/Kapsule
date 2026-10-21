import { ContenaireFormulaire } from "../contenaireFormulaire.tsx";
import { InputAndBtn } from "../inputAndBtn.tsx";
import { useTranslation } from "react-i18next";
import ButtonRemove from "../buttonRemove.tsx";

interface FormKapsule {
	tag: string[];
}

interface TagFormKapsuleProps {
	currentTag: string;
	setCurrentTag: (tag: string) => void;
	handleAddTag: () => void;
	handleRemoveTag: (tag: string) => void;
	formKapsule: FormKapsule;
}

export const TagFormKapsule = ({
	currentTag,
	setCurrentTag,
	handleAddTag,
	handleRemoveTag,
	formKapsule,
}: TagFormKapsuleProps) => {
	const { t } = useTranslation();
	return (
		<ContenaireFormulaire text={t("Formulaire.tags")}>
			<p className="text-sm text-gray-500 dark:text-gray-300">
				{t("Formulaire.descriptionTags")}
			</p>
			<InputAndBtn
				labelInput={t("Formulaire.ajouterTag")}
				type="text"
				nameInput="tag"
				valueInput={currentTag}
				placeholderInput={"tag"}
				onChangeInput={(e) => setCurrentTag(e.target.value)}
				disabledInput={false}
				requiredInput={false}
				onClickBtn={handleAddTag}
				textBtn={t("Formulaire.btnAjouterTag")}
			/>

			{/* Affichage des tags ajoutés en dessous */}
			<div className="flex flex-wrap gap-2">
				{formKapsule.tag.map((tag, index) => (
					<div
						key={index}
						className="flex items-center bg-blue-600 text-white rounded-full text-sm p-1"
					>
						<span>#{tag}</span>
						<ButtonRemove
							onClick={() => handleRemoveTag(tag)}
							index={index}
						/>
					</div>
				))}
			</div>
		</ContenaireFormulaire>
	);
};
