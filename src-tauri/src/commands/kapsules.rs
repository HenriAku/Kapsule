#![allow(dead_code)]
use crate::models::kapsule::Kapsule;
use std::sync::Mutex;
use tauri::State;
use crate::commands::file_manager::FileManager;

#[derive(Debug)]
/**
 * Structure de données pour les Kapsules
 */
pub struct Kapsules
{
	tab_kapsule: Vec<Kapsule>,
}

impl Kapsules
{
	/**
	 * Constructeur de la structure Kapsule
	 */
	pub fn new(tab_kapsule: Vec<Kapsule>) -> Kapsules
	{
		Kapsules
		{
			tab_kapsule,
		}
	}

	pub fn create_kapsule(&mut self, nouvelle_kapsule: Kapsule) -> Result<(), String> {
		self.add_kapsule(nouvelle_kapsule.clone());

		FileManager::new("kapsules.json")
			.append_kapsule(&nouvelle_kapsule)
			.map_err(|e| format!("Erreur fichier : {}", e))?;

		Ok(())
	}

	pub fn update_Kapsule_fav(&mut self, id: usize) -> Result<Option<Kapsule>, String> {
		let kapsule_modifier = {
			let kapsule = self.get_kapsule_by_id(id)
				.ok_or_else(|| format!("Kapsule avec l'ID {} non trouvée", id))?;
			let new_fav_state = !kapsule.get_favorite();
			kapsule.set_favorite(new_fav_state);
			
			kapsule.clone()
		};

		FileManager::new("kapsules.json")
			.update_kapsule(&self.tab_kapsule)
			.map_err(|e| format!("Erreur fichier : {}", e))?;
	   
		Ok(Some(kapsule_modifier))
	}

	pub fn remove_kapsule(&mut self, id: usize) -> Result<(), String> {
		if let Some(pos) = self.tab_kapsule.iter().position(|k| k.get_id() == id) {
			self.tab_kapsule.remove(pos);

			FileManager::new("kapsules.json")
				.update_kapsule(&self.tab_kapsule)
				.map_err(|e| format!("Erreur fichier : {}", e))?;

			Ok(())
		} else {
			Err(format!("Kapsule avec l'ID {} non trouvée", id))
		}
	}

	pub fn update_kapsule(&mut self, updated_kapsule: Kapsule) -> Result<(), String> {
		if let Some(kapsule) = self.get_kapsule_by_id(updated_kapsule.get_id()) {
			*kapsule = updated_kapsule.clone();

			FileManager::new("kapsules.json")
				.update_kapsule(&self.tab_kapsule)
				.map_err(|e| format!("Erreur fichier : {}", e))?;

			Ok(())
		} else {
			Err(format!("Kapsule avec l'ID {} non trouvée", updated_kapsule.get_id()))
		}
	}

	pub fn update_Kapsule_recent(&mut self, id: usize) -> Result<Option<Kapsule>, String> {
		// 1. On cherche l'index de la kapsule ciblée
		let index_cible = self.tab_kapsule.iter().position(|k| k.get_id() == id)
			.ok_or_else(|| format!("Kapsule avec l'ID {} non trouvée", id))?;

		let new_recent_state = !self.tab_kapsule[index_cible].get_activation();
		self.tab_kapsule[index_cible].set_activation(new_recent_state);

		// 2. Si la kapsule devient active, on désactive les autres (ou on gère l'ancienne kapsule récente)
		// On cherche s'il y avait une autre kapsule active (récente)
		if let Some(index_old) = self.tab_kapsule.iter().position(|k| k.get_activation() && k.get_id() != id) {
			self.tab_kapsule[index_old].set_activation(false);
		}

		// On clone la kapsule modifiée pour la retourner
		let kapsule_modifier = self.tab_kapsule[index_cible].clone();

		FileManager::new("kapsules.json")
			.update_kapsule(&self.tab_kapsule)
			.map_err(|e| format!("Erreur fichier : {}", e))?;
	
		Ok(Some(kapsule_modifier))
	}


	pub fn get_tab_kapsule(&self) -> &Vec<Kapsule>{ &self.tab_kapsule }
	pub fn get_kapsule_by_id(&mut self, id: usize) -> Option<&mut Kapsule> {
		self.tab_kapsule.iter_mut().find(|k| k.get_id() == id)
	}

	/**
	 * Ajouter une Kapsule à la liste des Kapsules
	 */
	fn add_kapsule(&mut self, kapsule: Kapsule)
	{ 
		self.tab_kapsule.push(kapsule);
	}
}

#[tauri::command]
pub fn obetenir_toutes_les_kapsules(
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Vec<Kapsule>, String> {
	let kapsules = state.lock().map_err(|e| e.to_string())?;
	Ok(kapsules.get_tab_kapsule().clone())
}

#[tauri::command]
pub fn update_kapsule_fav(
	id: usize,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Option<Kapsule>, String> {
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;
	kapsules.update_Kapsule_fav(id)
}

#[tauri::command]
pub fn ajouter_kapsule(
	id: usize,
	name: String,
	application: Vec<String>,
	path_application: Vec<String>,
	option: Vec<String>,
	tag: Vec<String>,
	activation: bool,
	favorite: bool,
	tache: Vec<String>,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Kapsule, String> {
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;

	let nouvelle_kapsule = Kapsule::new(
		id, name, application, path_application, option, tag, activation, favorite, tache,
	);

	kapsules.create_kapsule(nouvelle_kapsule.clone())?;

	Ok(nouvelle_kapsule)
}

#[tauri::command]
pub fn remove_kapsule(
	id: usize,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<(), String> {
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;
	kapsules.remove_kapsule(id)
}

#[tauri::command]
pub fn update_kapsule(
	id: usize,
	name: String,
	application: Vec<String>,
	path_application: Vec<String>,
	option: Vec<String>,
	tag: Vec<String>,
	activation: bool,
	favorite: bool,
	tache: Vec<String>,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Kapsule, String> {
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;

	let nouvelle_kapsule = Kapsule::new(
		id, name, application, path_application, option, tag, activation, favorite, tache,
	);

	kapsules.update_kapsule(nouvelle_kapsule.clone())?;

	Ok(nouvelle_kapsule)
}

#[tauri::command]
pub fn update_kapsule_recent(
	id: usize,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Option<Kapsule>, String> {
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;
	kapsules.update_Kapsule_recent(id)
}