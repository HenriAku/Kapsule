// src/commands/applications.rs
#![allow(dead_code)]
use crate::models::application::Application;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Applications {
	tab_applications: Vec<Application>,
}

impl Applications {
	pub fn new(tab_applications: Vec<Application>) -> Applications {
		Applications { tab_applications }
	}

	pub fn get_tab_applications(&self) -> &Vec<Application> {
		&self.tab_applications
	}

	// AJOUT 1 : Retourne une référence mutable pour pouvoir trier la liste
	pub fn get_tab_applications_mut(&mut self) -> &mut Vec<Application> {
		&mut self.tab_applications
	}

	pub fn add_application(&mut self, application: Application) {
		self.tab_applications.push(application);
	}

	// AJOUT 2 : Consomme la structure et retourne le Vec interne
	pub fn into_inner(self) -> Vec<Application> {
		self.tab_applications
	}
}