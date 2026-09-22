use std::fs::{File, OpenOptions};
use std::io::{self, Write, BufReader, BufRead};
use std::path::PathBuf;

use crate::models::kapsule::Kapsule;

pub struct FileManager 
{
	path: PathBuf,
}

impl FileManager {
	/**
	 * Crée une nouvelle instance de FileManager avec le chemin du fichier spécifié
	 */
	pub fn new(filepath: &str) -> Self {
		Self 
		{
			path: PathBuf::from(filepath),
		}
	}
	
	/**
	 * Ajoute du texte à la fin du fichier sans écraser l'existant
	 */
	pub fn append_kapsule(&self, kapsule: Kapsule) -> io::Result<()> 
	{
		let mut file = OpenOptions::new()
			.create(true)
			.append(true)
			.open(&self.path)?;

		let content = format!(
			"{{\"id\": {}, \"name\": \"{}\", \"application\": {:?}, \"path_application\": {:?}, \"option\": {:?}, \"tag\": {:?}, \"activation\": {}, \"favorite\": {}, \"tache\": {:?}}}\n",
			kapsule.get_id(),
			kapsule.get_name(),
			kapsule.get_application(),
			kapsule.get_path_application(),
			kapsule.get_option(),
			kapsule.get_tag(),
			kapsule.get_activation(),
			kapsule.get_favorite(),
			kapsule.get_tache()
		);

		file.write_all(content.as_bytes())?;
		Ok(())
	}

	pub fn update_kapsule(&self, kapsules: &[Kapsule]) -> io::Result<()> 
	{
		let mut file = File::create(&self.path)?;

		let mut content = String::new();

		for kapsule in kapsules.iter() {
			content.push_str(&format!(
				"{{\"id\": {}, \"name\": \"{}\", \"application\": {:?}, \"path_application\": {:?}, \"option\": {:?}, \"tag\": {:?}, \"activation\": {}, \"favorite\": {}, \"tache\": {:?}}}\n",
				kapsule.get_id(),
				kapsule.get_name(),
				kapsule.get_application(),
				kapsule.get_path_application(),
				kapsule.get_option(),
				kapsule.get_tag(),
				kapsule.get_activation(),
				kapsule.get_favorite(),
				kapsule.get_tache()
			));
		}
		file.write_all(content.as_bytes())?;

		Ok(())
	}

	/**
	 * Lit le fichier et retourne un Vec<Kapsule> en séparant toutes les lignes
	 */
	pub fn read_kapsules(&self) -> io::Result<Vec<Kapsule>> {
		let file = File::open(&self.path)?;
		let reader = BufReader::new(file);

		let mut kapsules = Vec::new();

		// Parcourt le fichier ligne par ligne
		for line in reader.lines() {
			let line_text = line?;
			
			// Ignore les lignes vides
			if line_text.trim().is_empty() { continue; }

			// Convertit le texte JSON de la ligne en structure Kapsule
			match serde_json::from_str::<Kapsule>(&line_text) 
			{
				Ok(kapsule) => kapsules.push(kapsule),
				Err(err) => eprintln!("Erreur lors du parsing d'une ligne : {}", err),
			}
		}

		Ok(kapsules)
	}
}