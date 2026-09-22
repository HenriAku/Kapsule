use std::fs;
use tauri::Manager;

// 1. Déclaration des modules
mod models;
mod commands;

// 2. Imports des structures nécessaires
use crate::models::file_manager::FileManager;
use crate::models::kapsule::Kapsule;
use crate::models::kapsules::Kapsules;
use crate::models::scanner::AppScanner;
use crate::commands::application_command::lancer_application;


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.setup(|app| {
			// Récupère le chemin vers le dossier AppData
			let app_dir = app.path().app_data_dir().expect("Dossier introuvable");
			fs::create_dir_all(&app_dir).ok();

			// Instancie le fichier kapsules.json
			let filepath = app_dir.join("kapsules.json");
			let filepath_str = filepath.to_str().expect("Chemin invalide");

			let file_manager = FileManager::new(filepath_str);

			let kapsule1 = Kapsule::new(
				1,
				"Kapsule 1".to_string(), 
				vec!("File Explorer".to_string(), "notepad".to_string()), 
				vec!("explorer.exe".to_string(), "notepad.exe".to_string()),
				vec!("C:\\Users\\rouge\\OneDrive\\Documents".to_string(), "default".to_string()),
				vec!("tools".to_string(), "tag1".to_string()), 
				false, 
				false, 
				vec!("tache1".to_string(), "tache2".to_string())
			);
			let kapsule2 = Kapsule::new(
				1,
				"Kapsule 2".to_string(), 
				vec!("Firefox".to_string(), "Discord".to_string()), 
				vec!("C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\Firefox.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string()),
				vec!("https://www.youtube.com/".to_string(), "default".to_string()),
				vec!("tools".to_string(), "tag1".to_string()), 
				false, 
				false, 
				vec!("tache1".to_string(), "tache2".to_string())
			);
			let kapsule3 = Kapsule::new(
				3,
				"Kapsule 3".to_string(), 
				vec!("File Explorer".to_string(), "Discord".to_string()),
				vec!("C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string(),"C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string(),"C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string(),"C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\File Explorer.lnk".to_string(), "C:\\Users\\rouge\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk".to_string()), 
				vec!("C:\\Users\\rouge\\OneDrive\\Documents\\Document Inportant.txt".to_string(), "default".to_string()),
				vec!("tag1".to_string(), "tag2".to_string()), 
				true, 
				false, 
				vec!("tache1".to_string(), "tache2".to_string())
			);
			
			// Écriture de test dans kapsules.json
			file_manager.append_kapsule(kapsule1);
			file_manager.append_kapsule(kapsule2);
			file_manager.append_kapsule(kapsule3);

			println!("Test réussi avec FileManager !");

			// Lecture de test
			let mut kapsules = Kapsules::new(file_manager.read_kapsules().expect("Erreur lors de la lecture du fichier"));
			if let Some(kapsule_test) = kapsules.get_kapsule_by_id(1) {
				println!("Name : {}", kapsule_test.get_name());
				println!("Favorite : {}", kapsule_test.get_favorite());
			}

			// Mise à jour de test
			if let Some(kapsule_update) = kapsules.get_kapsule_by_id(1) {
				kapsule_update.set_favorite(true);
			}

			file_manager.update_kapsule(kapsules.get_tab_kapsule()).expect("Erreur lors de la mise à jour du fichier");

			// Re-lecture après mise à jour
			let mut kapsules = Kapsules::new(file_manager.read_kapsules().expect("Erreur lors de la lecture du fichier"));
			if let Some(kapsule_test) = kapsules.get_kapsule_by_id(1) {
				println!("Name : {}", kapsule_test.get_name());
				println!("Favorite : {}", kapsule_test.get_favorite());
			}

			// Test de filtrage
			let kapsules_filtered = kapsules.get_kapsules_by_tag("tools");
			for kapsule in kapsules_filtered {
				println!("Name : {}", kapsule.get_name());
			}

			// Test de capsule récente
			if let Some(kapsule_recent) = kapsules.get_kapsule_by_activation() {
				println!("Name : {}", kapsule_recent.get_name());
			}

			// =========================================================================
			//  RÉCUPÉRATION ET AFFICHAGE DES APPLICATIONS TROUVÉES VIA APPSCANNER
			// =========================================================================
			let applications = AppScanner::obetenir_toutes_les_applications();

			println!("\n=======================================================");
			println!("  LISTE DES APPLICATIONS TROUVÉES ({})", applications.len());
			println!("=======================================================");

			for app in &applications {
				println!("[ID: {:2}] {:<30} | Path: {}", app.get_id(), app.get_name(), app.get_path());
			}

			println!("=======================================================\n");

			let mut kapsules = Kapsules::new(file_manager.read_kapsules().expect("Erreur lors de la lecture du fichier"));
			if let Some(kapsule_Lancer) = kapsules.get_kapsule_by_id(1) {
				lancer_application(kapsule_Lancer.get_path_application(), kapsule_Lancer.get_option());
			}
			Ok(())
		})
		.invoke_handler(tauri::generate_handler![
			// Place ici les fonctions décorées de #[tauri::command] si tu en as
		])
		.run(tauri::generate_context!())
		.expect("Erreur lors du lancement");
}