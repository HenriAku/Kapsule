import { useShortCut } from "../../hooks/shortCut/shortCut";
import { useTranslation } from "react-i18next";

export const ModalShortCut = ({
	id, 
	onRefresh, 
	isOpen, 
	onClose,
	name
}: {
	id: number; 
	onRefresh: () => void; 
	isOpen: boolean; 
	onClose: () => void;
	name: string;
}) => {
	const { t } = useTranslation();
	const { createShortCut } = useShortCut(id, name);

	const handleShortCut = async () => {
		const success = await createShortCut();
		if (success && onRefresh) {
			onRefresh();
		}
	};

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs ${isOpen ? '' : 'hidden'}`}>
			<div className="bg-white dark:bg-gray-900 rounded-2xl p-6 z-10 shadow-2xl shadow-black/50 border
					border-gray-200 dark:border-gray-800 max-w-sm w-full mx-4">
				<p className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
					{t("ModalShortCut.description")}
				</p>
				<div className="mt-6 flex justify-center space-x-3">
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
								rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
								focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
						onClick={onClose}
					>
						{t("ModalShortCut.btnAnnuler")}
					</button>
					<button
						type="button"
						className="bg-blue-900 box-border border border-transparent 
									hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium 
									shadow-xs font-bold leading-5 rounded-full text-sm 
									px-4 py-2.5 focus:outline-none text-white hover:bg-blue-800"
						onClick={async () => {
							handleShortCut();
							onClose();
						}}
					>
						{t("ModalShortCut.btnAjouter")}
					</button>
				</div>
			</div>
		</div>
	);
};