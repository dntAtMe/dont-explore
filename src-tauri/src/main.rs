#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{sync::Mutex};

use ftp::FtpStream;
use tauri::State;

struct Connection {
    connection: Mutex<FtpConnection>
}

#[derive(Default)]
struct FtpConnection {
    stream: Option<FtpStream>
}

impl FtpConnection {
    pub fn connect(&mut self, user: &str, password: &str) {
        let mut new_stream = FtpStream::connect("").unwrap();
        new_stream.login(user, password).unwrap();

        self.stream = Some(new_stream);
    }

    pub fn disconnect(&mut self) {
        match self.stream.as_mut() {
            Some(stream) => { stream.quit().unwrap() },
            None => { }
        };
    }

    pub fn list_files(&mut self) -> Vec<String> {
        self.stream.as_mut().unwrap().nlst(None).unwrap_or([].to_vec())
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn list_files(ftp_connection: State<Connection>) -> String {
    format!("{:?}", ftp_connection.connection.lock().unwrap().list_files())
}

#[tauri::command]
fn login(ftp_connection: State<Connection>) {
    let mut guard = ftp_connection.connection.lock().unwrap();

    guard.connect("", "");
}

#[tauri::command]
fn logout(ftp_connection: State<Connection>) {
    let mut guard = ftp_connection.connection.lock().unwrap();

    guard.disconnect();
}


fn main() {
    tauri::Builder::default()
        .manage(Connection { connection: Default::default() })
        .invoke_handler(tauri::generate_handler![list_files, login, logout])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
