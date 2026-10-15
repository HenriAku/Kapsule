import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

export async function verifierMiseAJour() {
	try {
		const update = await check();
		if (update) {
			console.log(`Nouvelle version trouvée : ${update.version}`);
			
			// Tu peux afficher une modale ici pour demander à l'utilisateur :
			// "Une mise à jour est disponible. Voulez-vous l'installer ?"
			
			// Si l'utilisateur accepte :
			await update.downloadAndInstall();
			
			// Redémarrage automatique de l'application
			await relaunch();
		} else {
			console.log("L'application est à jour.");
		}
	} catch (error) {
		console.error("Erreur lors de la vérification de la mise à jour :", error);
	}
}