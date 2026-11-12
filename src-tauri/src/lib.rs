use std::fs;
use std::sync::Mutex;
use tauri::Manager;

// 1. Déclaration des modules
mod commands;
mod models;

// 2. Imports des structures nécessaires
use crate::commands::application_command::lancer_application;
use crate::commands::file_manager::FileManager;
use crate::commands::kapsules::Kapsules;
use crate::commands::kapsules::{
	ajouter_kapsule, obetenir_toutes_les_kapsules, remove_kapsule, update_kapsule,
	update_kapsule_fav, update_kapsule_recent,
};
use crate::commands::scanner::obetenir_toutes_les_applications;
use crate::commands::short_cut::create_shortcut;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	tauri::Builder::default()
		.plugin(tauri_plugin_autostart::Builder::new().build())
		.plugin(tauri_plugin_updater::Builder::new().build()) // Ajout du plugin de mise à jour
		.plugin(tauri_plugin_process::init()) // Ajout du plugin de gestion des processus
		.plugin( // Ajout du plugin d'autostart
			tauri_plugin_autostart::init(
				tauri_plugin_autostart::MacosLauncher::LaunchAgent,
				None,
			)
		)
		.setup(|app| {
			let app_dir = app
				.path()
				.app_data_dir()
				.expect("Dossier AppData introuvable");
			fs::create_dir_all(&app_dir).ok();

			let filepath = app_dir.join("kapsules.json");
			let filepath_str = filepath.to_str().expect("Chemin invalide");

			let file_manager = FileManager::new(filepath_str);

			let initial_kapsules_list = file_manager.read_kapsules().unwrap_or_else(|err| {
				eprintln!("Erreur lors du chargement des kapsules : {err}");
				Vec::new()
			});

			// ⚠️ TOUJOURS enregistrer l'état global en premier pour que l'app React ait accès aux Kapsules !
			app.manage(Mutex::new(Kapsules::new(initial_kapsules_list.clone())));

			let arg: Vec<String> = std::env::args().collect();
			if arg.len() >= 3 {
				let id_arg = &arg[2];
				if let Ok(id) = id_arg.parse::<usize>() {
					if let Some(kapsule) = initial_kapsules_list.iter().find(|k| k.id == id) {
						let path_application = kapsule.path_application.clone();
						let option = kapsule.option.clone();

						let state: tauri::State<Mutex<Kapsules>> = app.state();
						let _ = update_kapsule_recent(id, state);

						// Lance l'application associée à la Kapsule
						let _ = lancer_application(path_application, option);
					} else {
						eprintln!("Aucune Kapsule trouvée avec l'ID : {}", id);
					}
				} else {
					eprintln!("Argument d'ID invalide : {}", id_arg);
				}
			}
			
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
			update_kapsule_recent,
			create_shortcut
		])
		.run(tauri::generate_context!())
		.expect("Erreur lors du lancement de Tauri");
}
