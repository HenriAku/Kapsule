import {ShortCutService} from '../../service/shortCutService';

export function useShortCut(id: number, name: string) {
    const createShortCut = async () => {
        try {
            const shortCuts = await ShortCutService.create_shortcut(id, name);
            return shortCuts;
        } catch (error) {
            console.error("Erreur lors de la création du raccourci :", error);
            return [];
        }
    };

    return { createShortCut };
}