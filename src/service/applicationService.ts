import { invoke } from '@tauri-apps/api/core';

export interface Application {
	id: number;
	name: string;
	path: string;
}

// Service avec les méthodes typées
export const ApplicationsService = {
	// Récupérer toutes les applications
	getToutesLesApplications: async (): Promise<Application[]> => {
		return await invoke<Application[]>('obetenir_toutes_les_applications');
	},

	lancerApplication: async (path_application: string[], option: string[]): Promise<void> => {
		await invoke<void>('lancer_application', { pathApplication : path_application, option });
	}
};