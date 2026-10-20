use std::fs;
use std::sync::Mutex;
use tauri::Manager;

// 1. Déclaration des modules
mod models;
mod commands;

// 2. Imports des structures nécessaires
use crate::commands::file_manager::FileManager;
use crate::models::kapsule::Kapsule;
use crate::commands::kapsules::Kapsules;
use crate::commands::scanner::obetenir_toutes_les_applications;
use crate::commands::kapsules::{obetenir_toutes_les_kapsules, ajouter_kapsule,
								update_kapsule_fav, remove_kapsule, update_kapsule
								, update_kapsule_recent};
use crate::commands::application_command::lancer_application;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_updater::Builder::new().build()) // Ajout du plugin de mise à jour
		.plugin(tauri_plugin_process::init()) // Ajout du plugin de gestion des processus
		.setup(|app| {
			// Récupère le chemin vers le dossier AppData de l'application
			let app_dir = app.path().app_data_dir().expect("Dossier AppData introuvable");
			fs::create_dir_all(&app_dir).ok();

			let filepath = app_dir.join("kapsules.json");
			let filepath_str = filepath.to_str().expect("Chemin invalide");

			let file_manager = FileManager::new(filepath_str);

			// Charger les capsules existantes
			let initial_kapsules_list = file_manager
				.read_kapsules()
				.unwrap_or_else(|err| {
					eprintln!("Erreur lors du chargement des kapsules : {err}");
					Vec::new()
				});

			// ⚠️ ÉTAPE CLÉ MANQUANTE :
			// On enregistre l'état global partagé dans Tauri pour qu'il soit accessible par vos @tauri::command
			app.manage(Mutex::new(Kapsules::new(initial_kapsules_list)));

			Ok(())
		})
		.invoke_handler(tauri::generate_handler![
			obetenir_toutes_les_kapsules,
			ajouter_kapsule,
			obetenir_toutes_les_applications,
			lancer_application,
			update_kapsule_fav,
			remove_kapsule,
			update_kapsule,
			update_kapsule_recent
		])
		.run(tauri::generate_context!())
		.expect("Erreur lors du lancement de Tauri");
}