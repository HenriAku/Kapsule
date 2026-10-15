import { check } from '@tauri-apps/plugin-updater';

export async function verifierMiseAJour() {
	try {
		const update = await check();
		if (update) {
			return { available: true, version: update.version, updateObject: update };
		}
		return { available: false };
	} catch (error) {
		console.error("Erreur lors de la vérification de la mise à jour :", error);
		throw error;
	}
}