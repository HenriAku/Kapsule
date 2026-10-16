import { checkForUpdates } from "../../utils/updater";

export function UpdateButton() {
	return (
		<button
			type="button"
			onClick={() => void checkForUpdates()} 
			className="bg-blue-800 box-border border border-transparent 
						hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium 
						shadow-xs font-bold leading-5 rounded-full text-sm 
						px-4 py-2.5 focus:outline-none text-white hover:bg-blue-500"
			>
			Rechercher une mise à jour
		</button>
	);
}