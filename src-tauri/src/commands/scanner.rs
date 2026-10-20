use std::fs;
use std::path::{Path, PathBuf};
use crate::models::application::Application;
use crate::commands::applications::Applications;

/// Structure responsable de la recherche et du scan des applications installées sur le système.
pub struct AppScanner;

impl AppScanner {
	/// Méthode récursive privée qui parcourt un dossier donné pour trouver tous les fichiers `.lnk`.
	fn scanner_dossier(
		dossier: &Path, 
		applications: &mut Applications, 
		next_id: &mut usize
	) {
		// Tente de lire le contenu du dossier. Si le dossier n'existe pas ou n'est pas accessible, on ignore l'erreur.
		if let Ok(entrees) = fs::read_dir(dossier) {
			// `flatten()` filtre automatiquement les erreurs de lecture d'entrées individuelles.
			for entree in entrees.flatten() {
				let path = entree.path();

				// Si l'entrée est un sous-dossier, on effectue un appel récursif pour fouiller dedans.
				if path.is_dir() {
					Self::scanner_dossier(&path, applications, next_id);
				} 
				// Sinon, si le fichier a l'extension ".lnk" (raccourci Windows)
				else if path.extension().and_then(|s| s.to_str()) == Some("lnk") {
					// On extrait le nom du fichier sans son extension (.lnk)
					if let Some(nom) = path.file_stem().and_then(|s| s.to_str()) {
						let nom_lower = nom.to_lowercase();
						
						// Filtrage basique pour écarter les liens d'aide ou de désinstallation
						if !nom_lower.contains("uninstall") 
							&& !nom_lower.contains("désinstaller") 
							&& !nom_lower.contains("help") 
							&& !nom_lower.contains("aide")
							&& !nom_lower.contains("about")
							&& !nom_lower.contains("à propos")
							&& !nom_lower.contains("manuel")
							&& !nom_lower.contains("file explorer")
						{
							// Création et ajout de l'instance d'Application dans le vecteur
							applications.add_application(Application::new(
								*next_id,
								nom.to_string(),
								path.to_string_lossy().to_string(), // Convertit le PathBuf en String
							));
							
							// On incrémente le compteur pour le prochain identifiant
							*next_id += 1;
						}
					}
				}
			}
		}
	}

	/// Méthode publique principale qui récupère toutes les applications installées dans le Menu Démarrer.
	pub fn scanner_systeme() -> Vec<Application> {
		let mut current_id = 1;
		let mut applications = Applications::new(Vec::new());

		//Ajout en dur d application
		applications.add_application(Application::new(
			current_id,
			"File Explorer".to_string(),
			"explorer.exe".to_string(),
		));
		current_id += 1;

		// Ajout d'autres applications
		applications.add_application(Application::new(
			current_id,
			"notepad".to_string(),
			"notepad.exe".to_string(),
		));
		current_id += 1;

		applications.add_application(Application::new(
			current_id,
			"snippingtool".to_string(),
			"snippingtool.exe".to_string(),
		));
		current_id += 1;

		let chemin_global = PathBuf::from(r"C:\ProgramData\Microsoft\Windows\Start Menu\Programs");
		Self::scanner_dossier(&chemin_global, &mut applications, &mut current_id);

		// On récupère dynamiquement la variable d'environnement APPDATA (ex: C:\Users\rouge\AppData\Roaming)
		if let Ok(appdata) = std::env::var("APPDATA") {
			let chemin_user = PathBuf::from(appdata)
				.join(r"Microsoft\Windows\Start Menu\Programs");
			Self::scanner_dossier(&chemin_user, &mut applications, &mut current_id);
		}

		// --- 3. TRI PAR ORDRE ALPHABÉTIQUE ---
		// Trie la liste par nom d'application (en ignorant la casse)
		applications.get_tab_applications_mut().sort_by(|a, b| {
			a.get_name().to_lowercase().cmp(&b.get_name().to_lowercase())
		});

		// --- 4. ENLEVER LES DOUBLONS ---
		// Supprime les doublons de la liste (en comparant les noms)
		applications.get_tab_applications_mut().dedup_by(|a, b| {
			a.get_name().to_lowercase() == b.get_name().to_lowercase()
		});

		applications.into_inner()
	}
}

#[tauri::command]
pub fn obetenir_toutes_les_applications() -> Vec<Application> {
    AppScanner::scanner_systeme()
}