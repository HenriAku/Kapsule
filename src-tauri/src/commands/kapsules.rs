#![allow(dead_code)]
use crate::models::kapsule::Kapsule;

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
	 * Récupère les Kapsules par un tag spécifique
	 */
	pub fn get_kapsules_by_tag(&mut self, tag: &str) -> Vec<&mut Kapsule>
	{
		self.tab_kapsule
			.iter_mut()
			.filter(|kapsule| kapsule.get_tag().contains(&tag.to_string()))
			.collect()
	}

	/**
	 * Récupère la Kapsule utiliser recament activation
	 */
	pub fn get_kapsule_by_activation(&mut self) -> Option<&mut Kapsule> 
	{
		self.tab_kapsule.iter_mut().find(|kapsule| kapsule.get_activation() == true)
	}

	/**
	 * Ajouter une Kapsule à la liste des Kapsules
	 */
	fn add_kapsule(&mut self, kapsule: Kapsule)
	{ 
		self.tab_kapsule.push(kapsule);
	}
}

