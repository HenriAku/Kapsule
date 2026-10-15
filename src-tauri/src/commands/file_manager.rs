use std::fs::{self, File, OpenOptions};
use std::io::{self, Write, BufReader, BufRead};
use std::path::PathBuf;

use crate::models::kapsule::Kapsule;

pub struct FileManager {
    path: PathBuf,
}

impl FileManager {
    /// Récupère automatiquement AppData et y joint le nom du fichier passé en paramètre
    pub fn new(filename: &str) -> Self {
        // 1. On récupère le chemin vers AppData/Roaming (sous Windows)
        let mut full_path = match dirs::data_dir() {
            Some(path) => path,
            None => {
                // Secours sous Windows si dirs n'est pas utilisé :
                let appdata_env = std::env::var("APPDATA").unwrap_or_else(|_| ".".to_string());
                PathBuf::from(appdata_env)
            }
        };

        // 2. On crée le sous-dossier de ton application dans AppData s'il n'existe pas
        full_path.push("Kapsule"); // <-- Change "TonNomDApp" par le nom de ton projet
        let _ = fs::create_dir_all(&full_path);

        // 3. On joint le nom du fichier ("kapsules.json")
        full_path.push(filename);

        Self {
            path: full_path,
        }
    }

    pub fn append_kapsule(&self, kapsule: &Kapsule) -> io::Result<()> {
        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.path)?;

        let content = serde_json::to_string(kapsule)
            .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;

        writeln!(file, "{}", content)?;
        Ok(())
    }

    pub fn update_kapsule(&self, kapsules: &[Kapsule]) -> io::Result<()> {
        let mut file = File::create(&self.path)?;

        for kapsule in kapsules {
            let line = serde_json::to_string(kapsule)
                .map_err(|e| io::Error::new(io::ErrorKind::InvalidData, e))?;
            writeln!(file, "{}", line)?;
        }

        Ok(())
    }

    pub fn read_kapsules(&self) -> io::Result<Vec<Kapsule>> {
        let file = File::open(&self.path)?;
        let reader = BufReader::new(file);

        let mut kapsules = Vec::new();

        for line in reader.lines() {
            let line_text = line?;
            if line_text.trim().is_empty() { continue; }

            match serde_json::from_str::<Kapsule>(&line_text) {
                Ok(kapsule) => kapsules.push(kapsule),
                Err(err) => eprintln!("Erreur lors du parsing : {}", err),
            }
        }

        Ok(kapsules)
    }
}