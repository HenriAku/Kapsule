import { invoke } from '@tauri-apps/api/core';

export interface Kapsule {
	id: number;
	name: string;
	application: string[];
	path_application: string[];
	option: string[];
	tag: string[];
	activation: boolean;
	favorite: boolean;
	tache: string[];
}

// Service avec les méthodes typées
export const KapsuleService = {
	// Récupérer toutes les kapsules
	getToutesLesKapsules: async (): Promise<Kapsule[]> => {
		return await invoke<Kapsule[]>('obetenir_toutes_les_kapsules');
	},

	updateKapsuleFavorite: async (id: number): Promise<Kapsule | null> => {
		return await invoke<Kapsule | null>('update_kapsule_fav', { id });
	},

	// Ajouter une nouvelle kapsule
	ajouterKapsule: async (kapsuleData: Kapsule): Promise<void> => {
		return await invoke("ajouter_kapsule", {
			...kapsuleData,
		});
	},

	removeKapsule: async (id: number): Promise<void> => {
		return await invoke("remove_kapsule", { id });
	},

	updateKapsule: async (kapsuleData: Kapsule): Promise<void> => {
		return await invoke("update_kapsule", {
			...kapsuleData,
		});
	},

	updateKapsuleRecent: async (id: number): Promise<void> => {
		return await invoke("update_kapsule_recent", { id });
	}
};