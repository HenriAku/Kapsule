#![allow(dead_code)]
use crate::models::kapsule::Kapsule;
use std::sync::Mutex;
use tauri::State;

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

	pub fn create_kapsule(
		&mut self,
		id: usize,
		name: String,
		application: Vec<String>,
		path_application: Vec<String>,
		option: Vec<String>,
		tag: Vec<String>,
		activation: bool,
		favorite: bool,
		tache: Vec<String>,
	) -> Kapsule {
		// On instancie la Kapsule via le constructeur du modèle
		let nouvelle_kapsule = Kapsule::new(
			id,
			name,
			application,
			path_application,
			option,
			tag,
			activation,
			favorite,
			tache,
		);

		// Ici vous pouvez aussi l'ajouter à votre liste globale (ex: un tauri::State)

		self.add_kapsule(nouvelle_kapsule.clone());

		// On la retourne au JS (grâce à serde, elle est convertie en objet JSON)
		nouvelle_kapsule
	}

	pub fn get_tab_kapsule(&self) -> &Vec<Kapsule>{ &self.tab_kapsule }
	pub fn get_kapsule(&self, index: usize) -> Option<&Kapsule>{ self.tab_kapsule.get(index) }

	/**
	 * Récupère une Kapsule par son ID
	 */
	pub fn get_kapsule_by_id(&mut self, id: usize) -> Option<&mut Kapsule> 
	{
		self.tab_kapsule.iter_mut().find(|kapsule| kapsule.get_id() == id)
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
	// On verrouille l'accès au Mutex pour récupérer l'instance de Kapsules
	let kapsules = state.lock().map_err(|e| e.to_string())?;
	Ok(kapsules.get_tab_kapsule().clone())
}

#[tauri::command]
pub fn obetenir_kapsule_par_id(
	id: usize,
	state: State<'_, Mutex<Kapsules>>,
) -> Result<Option<Kapsule>, String> {
	// On verrouille l'accès au Mutex en mode mutable
	let mut kapsules = state.lock().map_err(|e| e.to_string())?;
	Ok(kapsules.get_kapsule_by_id(id).cloned())
}