#![allow(dead_code)]
use serde::{Deserialize, Serialize};
#[derive(Debug, Deserialize, Serialize, Clone)]
/**
 * Structure de données pour les Kapsules
 */
pub struct Application 
{
	id: usize,
	name: String,
    path: String,
}

impl Application 
{
	/**
	 * Constructeur de la structure Kapsule
	 */
	pub fn new(id: usize,name: String, path: String) -> Application 
	{
		Application 
		{id, name, path,}
	}

	/**
	 * Getters pour les champs de la structure Kapsule
     */
    pub fn get_id(&self) -> usize { self.id }
    pub fn get_name(&self) -> &String { &self.name }
    pub fn get_path(&self) -> &String { &self.path }

    /**
     * Setters pour les champs de la structure Kapsule
     */
    pub fn set_name(&mut self, name: String) { self.name = name; }
    pub fn set_path(&mut self, path: String) { self.path = path; }
}
