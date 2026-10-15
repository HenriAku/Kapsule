"use client";

import { KapsuleService } from "../../service/kapsuleService";

export function useRemoveKapsule() {

	const toggleRemove = async (id: number) => {
		try {
			await KapsuleService.removeKapsule(id);
			return true;
		} catch (error) {
			console.error("Erreur lors de la suppression de la kapsule :", error);
			return false;
		}
	};

	return {toggleRemove};
}