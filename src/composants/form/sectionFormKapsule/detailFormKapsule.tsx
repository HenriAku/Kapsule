import { ContenaireFormulaire } from "../contenaireFormulaire.tsx";
import Input from "../input.tsx";
import { useTranslation } from "react-i18next";

export const DetailFormKapsule = ({
    formKapsule,
    handleChange,
}: {
    formKapsule: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const { t } = useTranslation();
    
    return (
        <ContenaireFormulaire text={t("Formulaire.detailsKapsule")}>
            <Input
                label={t("Formulaire.nomKapsule")}
                type="text"
                name="name"
                value={formKapsule.name}
                placeholder={t("Formulaire.placeholder")}
                onChange={handleChange}
                disabled={false}
                required={true}
            />
            <div className="flex flex-row gap-5 items-center">
                <label className="block text-black dark:text-white">
                    {t("Formulaire.favorite")}
                </label>
                <input
                    type="checkbox"
                    name="favorite"
                    checked={formKapsule.favorite}
                    onChange={handleChange}
                />
            </div>
        </ContenaireFormulaire>
    );
};