use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use windows::core::PCWSTR;
use windows::Win32::UI::Shell::ShellExecuteW;
use windows::Win32::UI::WindowsAndMessaging::SW_SHOW;

#[tauri::command]
pub fn lancer_application(path_application: &[String], option: &[String]) {
	for (i, chemin_cible) in path_application.iter().enumerate() 
	{
		let argument_raw = option.get(i).map(|s| s.as_str()).unwrap_or("default");

		// Encodage de l'opération
		let operation: Vec<u16> = OsStr::new("open")
			.encode_wide()
			.chain(std::iter::once(0))
			.collect();

		// Encodage du chemin de l'application
		let file: Vec<u16> = OsStr::new(chemin_cible)
			.encode_wide()
			.chain(std::iter::once(0))
			.collect();

		// Préparation et maintien en mémoire des arguments pour éviter l'Access Violation
		let parameters_opt: Option<Vec<u16>> = if argument_raw != "default" && !argument_raw.is_empty() {
			Some(
				OsStr::new(argument_raw)
					.encode_wide()
					.chain(std::iter::once(0))
					.collect(),
			)
		} else {
			None
		};

		// Extraction sécurisée du PCWSTR
		let param_ptr = match &parameters_opt {
			Some(p) => PCWSTR(p.as_ptr()),
			None => PCWSTR::null(),
		};

		unsafe {
			ShellExecuteW(
				None,
				PCWSTR(operation.as_ptr()),
				PCWSTR(file.as_ptr()),
				param_ptr,
				PCWSTR::null(),
				SW_SHOW,
			);
		}
	}
}