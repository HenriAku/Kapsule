
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

export async function checkForUpdates() {
	try {
		const update = await check();

		if (!update) {
			return { status: "up-to-date" as const };
		}

		const confirmed = window.confirm(
			`La version ${update.version} est disponible. Voulez-vous l'installer maintenant ?`
		);

		if (!confirmed) {
			return { status: "cancelled" as const };
		}

		await update.downloadAndInstall();

		await relaunch();

		return { status: "updated" as const };
	} catch (error) {
		console.error("Erreur de mise à jour :", error);
		return { status: "error" as const, error };
	}
}
