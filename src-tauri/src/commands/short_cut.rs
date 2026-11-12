use windows::core::{HSTRING, Interface};
use windows::Win32::System::Com::{
	CoCreateInstance, CoInitializeEx, CoUninitialize, CLSCTX_INPROC_SERVER,
	COINIT_APARTMENTTHREADED, IPersistFile,
};
use windows::Win32::UI::Shell::{IShellLinkW, ShellLink};

#[tauri::command]
pub fn create_shortcut(id: usize, name: String) -> Result<(), String> {
	// 1. Récupère le profil utilisateur
	let user_profile = std::env::var("USERPROFILE")
		.map_err(|_| "Impossible de récupérer le profil utilisateur".to_string())?;

	// 2. Détermine le bon dossier Bureau (OneDrive ou classique)
	let onedrive_desktop = format!("{}\\OneDrive\\Bureau", user_profile);
	let standard_desktop = format!("{}\\Desktop", user_profile);

	let desktop_path = if std::path::Path::new(&onedrive_desktop).exists() {
		onedrive_desktop
	} else {
		standard_desktop
	};

	let shortcut_filename = format!("{}.lnk", name.replace(" ", "_"));
	let full_shortcut_path = format!("{}\\{}", desktop_path, shortcut_filename);

	// 3. Récupère le chemin de l'exécutable actuel
	let exe_path = std::env::current_exe()
		.map_err(|_| "Impossible de récupérer le chemin de l'exécutable".to_string())?;

	let arguments = format!("--id {}", id);

	// 4. Création native du raccourci via l'API COM Windows (Instantané)
	unsafe {
		// Initialise COM pour le thread
		let _ = CoInitializeEx(None, COINIT_APARTMENTTHREADED);

		// Crée l'instance ShellLink
		let shell_link: IShellLinkW = CoCreateInstance(&ShellLink, None, CLSCTX_INPROC_SERVER)
			.map_err(|e| format!("Erreur CoCreateInstance : {}", e))?;

		// Configure le chemin cible de l'application (.exe)
		shell_link.SetPath(&HSTRING::from(exe_path.to_str().unwrap()))
			.map_err(|e| format!("Erreur SetPath : {}", e))?;

		// Configure les arguments (--id ...)
		shell_link.SetArguments(&HSTRING::from(arguments))
			.map_err(|e| format!("Erreur SetArguments : {}", e))?;

		// Récupère l'interface IPersistFile pour enregistrer le fichier sur le disque
		let persist_file: IPersistFile = shell_link.cast()
			.map_err(|e| format!("Erreur de conversion IPersistFile : {}", e))?;

		// Sauvegarde physique du fichier .lnk
		persist_file.Save(&HSTRING::from(&full_shortcut_path), true)
			.map_err(|e| format!("Erreur lors de la sauvegarde du fichier : {}", e))?;

		// Nettoie l'initialisation COM
		CoUninitialize();
	}

	Ok(())
}