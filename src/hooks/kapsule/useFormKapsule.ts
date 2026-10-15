"use client";

import { useState, useEffect } from "react";
import { KapsuleService, Kapsule as KapsuleType,} from "../../service/kapsuleService";
import { Application } from "../../service/applicationService";

export function useFormKapsule(applications: Application[], kapsuleToEdit?: KapsuleType) {
	const [formKapsule, setFormData] = useState<KapsuleType>({
		id: 0,
		name: "",
		application: [],
		path_application: [],
		option: [],
		tag: [],
		activation: false,
		favorite: false,
		tache: [],
	});

	// États temporaires pour les champs en cours de saisie
	const [currentTag, setCurrentTag] = useState("");
	const [currentApp, setCurrentApp] = useState("");
	const [currentPathApp, setCurrentPathApp] = useState("");
	const [currentOption, setCurrentOption] = useState("");

	const [loadingKapsule, setLoading] = useState(false);
	const [errorKapsule, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [success, setSuccess] = useState(false);


	useEffect(() => {
		if (kapsuleToEdit) {
			setFormData(kapsuleToEdit);
		}
	}, [kapsuleToEdit]);

	// Gestion du nom et du checkbox favorite
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	// --- GESTION DES TAGS (Ajout au clic sur ButtonAdd) ---
	const handleAddTag = () => {
		if (!currentTag.trim()) return;
		setFormData((prev) => ({
			...prev,
			tag: [...prev.tag, currentTag.trim()],
		}));
		setCurrentTag("");
	};

	const handleRemoveTag = (index: number) => {
		setFormData((prev) => ({
			...prev,
			tag: prev.tag.filter((_, i) => i !== index),
		}));
	};

	// --- GESTION DES APPLICATIONS ET OPTIONS ---
	const handleSelectAppChange = (selectedValue: string) => {
		setCurrentApp(selectedValue);
		const foundApp = applications.find(
			(app) =>
				String(app.id) === selectedValue || app.name === selectedValue,
		);
		const appPath = foundApp
			? (foundApp as any).path || (foundApp as any).path_application || ""
			: "";
		setCurrentPathApp(appPath);
	};

	const handleAddAppAndOption = () => {
		if (!currentApp.trim()) return;
		setFormData((prev) => ({
			...prev,
			application: [...prev.application, currentApp],
			path_application: [...prev.path_application, currentPathApp],
			option: [...prev.option, currentOption.trim() || "default"],
		}));

		setCurrentApp("");
		setCurrentPathApp("");
		setCurrentOption("");
	};

	const handleRemoveApp = (index: number) => {
		setFormData((prev) => ({
			...prev,
			application: prev.application.filter((_, i) => i !== index),
			path_application: prev.path_application.filter(
				(_, i) => i !== index,
			),
			option: prev.option.filter((_, i) => i !== index),
		}));
	};

	// --- SOUMISSION ---
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccessMessage("");
		setSuccess(false);

		try {
			const cleanFormData = {
				...formKapsule,
				id: formKapsule.id || Date.now(),
				tag: formKapsule.tag.filter((t) => t.trim() !== ""),
				application: formKapsule.application.filter(
					(a) => a.trim() !== "",
				),
				pathApplication: formKapsule.path_application.filter(
					(p) => p.trim() !== "",
				),
				option: formKapsule.option.map((o) =>
					o.trim() !== "" ? o : "default",
				),
			};

			if (kapsuleToEdit && formKapsule.id !== 0) {
				await KapsuleService.updateKapsule(cleanFormData);
				setSuccess(true);
			} else {
				await KapsuleService.ajouterKapsule(cleanFormData);
				setSuccessMessage("Kapsule créée avec succès.");
			}

			setFormData({
				id: 0,
				name: "",
				application: [],
				path_application: [],
				option: [],
				tag: [],
				activation: false,
				favorite: false,
				tache: [],
			});

		} catch (err: any) {
			const message =
				err?.response?.data?.message || err?.message || String(err);
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	return {
		formKapsule,
		currentTag,
		setCurrentTag,
		currentApp,
		currentOption,
		setCurrentOption,
		loadingKapsule,
		errorKapsule,
		successMessage,
		success,
		handleChange,
		handleAddTag,
		handleRemoveTag,
		handleSelectAppChange,
		handleAddAppAndOption,
		handleRemoveApp,
		handleSubmit,
	};
}
