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

			// Charger les capsules existantes ou créer les capsules de test si le fichier est vide
			let initial_kapsules_list = match file_manager.read_kapsules() {
				Ok(list) if !list.is_empty() => list,
				_ => {
					// Si le fichier n'existe pas ou est vide, on initialise avec tes données de test
					let kapsule1 = Kapsule::new(
						1,
						"Development web Fleuriste".to_string(), 
						vec!["File Explorer".to_string(), "notepad".to_string()], 
						vec!["C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "notepad.exe".to_string()],
						vec!["C:\\Users\\rouge\\OneDrive\\Documents".to_string(), "default".to_string()],
						vec!["Ent".to_string(), "Dev".to_string()], 
						false, 
						true, 
						vec!["Faire navbar".to_string(), "methode de vente".to_string()]
					);
					let kapsule2 = Kapsule::new(
						2, // ID ajusté à 2
						"Dev portfolio".to_string(), 
						vec!["Firefox".to_string(), "Discord".to_string()], 
						vec!["C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Firefox.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string()],
						vec!["https://www.youtube.com/".to_string(), "default".to_string()],
						vec!["Perso".to_string(), "Dev".to_string()], 
						false, 
						false, 
						vec!["Creation des card projet".to_string(), "Ajouter PP".to_string()]
					);
					let kapsule3 = Kapsule::new(
						3,
						"Development web Ecommerce".to_string(), 
						vec!["File Explorer".to_string(), "Discord".to_string()], 
						vec!["C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string()], 
						vec!["C:\\Users\\rouge\\OneDrive\\Documents\\Document Inportant.txt".to_string(), "default".to_string()],
						vec!["Dev".to_string(), "Ent".to_string()], 
						true, 
						false, 
						vec!["ajout panier".to_string(), "Api stipe".to_string()]
					);

					let list = vec![kapsule1, kapsule2, kapsule3];
					let _ = file_manager.update_kapsule(&list);
					list
				}
			};

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