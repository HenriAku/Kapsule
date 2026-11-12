import {invoke} from '@tauri-apps/api/core';

export interface ShortCut {
	id: number;
	name: string;
}

export const ShortCutService = {
	// Récupérer tous les raccourcis
	create_shortcut: async (id: number, name: string): Promise<ShortCut[]> => {
		return await invoke<ShortCut[]>('create_shortcut' , { id, name });
	},
}