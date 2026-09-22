#![allow(dead_code)]
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
/**
 * Structure de données pour les Kapsules
 */
pub struct Kapsule 
{
	id: usize,
	name: String,
	application : Vec<String>,
	path_application : Vec<String>,
	option: Vec<String>,
	tag: Vec<String>,
	activation: bool,
	favorite: bool,
	tache : Vec<String>,
}

impl Kapsule 
{
	/**
	 * Constructeur de la structure Kapsule
	 */
	pub fn new(
		id: usize,
		name: String, 
		application: Vec<String>, 
		path_application: Vec<String>,
		option: Vec<String>,
		tag: Vec<String>, 
		activation: bool, 
		favorite: bool, 
		tache: Vec<String>) -> Kapsule 
	{
		Kapsule 
		{
			id,
			name,
			application,
			path_application,
			option,
			tag,
			activation,
			favorite,
			tache,
		}
	}

	/**
	 * Getters pour les champs de la structure Kapsule
	 */
	pub fn get_id(&self) -> usize { self.id }
	pub fn get_name(&self) -> &String { &self.name }
	pub fn get_application(&self) -> &Vec<String> { &self.application }
	pub fn get_path_application(&self) -> &Vec<String> { &self.path_application }
	pub fn get_option(&self) -> &Vec<String> { &self.option }
	pub fn get_tag(&self) -> &Vec<String> { &self.tag }
	pub fn get_tache(&self) -> &Vec<String> { &self.tache }
	pub fn get_activation(&self) -> bool { self.activation }
	pub fn get_favorite(&self) -> bool { self.favorite }

	/**
	 * Setters pour les champs de la structure Kapsule
	 */
	pub fn set_name(&mut self, name: String) { self.name = name; }
	pub fn set_application(&mut self, application: Vec<String>) { self.application = application; }
	pub fn set_path_application(&mut self, path_application: Vec<String>) { self.path_application = path_application; }
	pub fn set_option(&mut self, option: Vec<String>) { self.option = option; }
	pub fn set_tag(&mut self, tag: Vec<String>) { self.tag = tag; }
	pub fn set_tache(&mut self, tache: Vec<String>) { self.tache = tache; }
	pub fn set_activation(&mut self, activation: bool) { self.activation = activation; }
	pub fn set_favorite(&mut self, favorite: bool) { self.favorite = favorite; }
}

