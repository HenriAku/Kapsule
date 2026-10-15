import { useRemoveKapsule } from "../../hooks/kapsule/useRemoveKapsule";
import { useTranslation } from "react-i18next";

export const ModalRemove = ({
	id, 
	onRefresh, 
	isOpen, 
	onClose
}: {
	id: number; 
	onRefresh: () => void; 
	isOpen: boolean; 
	onClose: () => void;
}) => {
	const { t } = useTranslation();
	const { toggleRemove } = useRemoveKapsule();

	const handleDelete = async () => {
		const success = await toggleRemove(id);
		if (success && onRefresh) {
			onRefresh();
		}
	};

	return (
		<div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs ${isOpen ? '' : 'hidden'}`}>
			<div className="bg-white dark:bg-gray-900 rounded-2xl p-6 z-10 shadow-2xl shadow-black/50 border
					border-gray-200 dark:border-gray-800 max-w-sm w-full mx-4">
				<p className="text-lg font-medium text-gray-900 dark:text-gray-100 text-center">
					{t("ModalRemove.description")}
				</p>
				<div className="mt-6 flex justify-center space-x-3">
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium 
							rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none 
							focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
						onClick={async () => {
							await handleDelete();
							onClose();
						}}
					>
						{t("ModalRemove.btnSupprimer")}
					</button>
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium 
							rounded-full shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 
							hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none 
							focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
						onClick={onClose}
					>
						{t("ModalRemove.btnAnnuler")}
					</button>
				</div>
			</div>
		</div>
	);
};