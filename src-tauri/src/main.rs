#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{sync::Mutex, usize};
use chrono::{NaiveDateTime};

use ftp::FtpStream;
use serde::Serialize;
use tauri::State;

struct Connection {
    connection: Mutex<FtpConnection>
}

#[derive(Default)]
struct FtpConnection {
    stream: Option<FtpStream>
}

#[derive(Debug, Clone, Serialize)]
struct NodeData {
    name: String,
    mode: String,
    size: usize,
    modification_date: i64,
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

    pub fn list_node_names(&mut self) -> Vec<String> {
        self.stream.as_mut().unwrap().nlst(None).unwrap_or([].to_vec())
    }

    // pub fn get_current_path(&mut self) -> String {
    //    self.stream.as_mut().unwrap().pwd().unwrap()
    // }
 
    pub fn change_path(&mut self, path: &str) {
        self.stream.as_mut().unwrap().cwd(path).unwrap()
    }

    /**
     * FTP listing format: (Luckily in my case, same as ls -l output format)
     * drwxr-xr-x   1       ftp     ftp     0       Sep 25 2022     scripts.cfg
     * mode         #links  owner   group   size    date            name
     * 
     * */
    pub fn list_nodes(&mut self) -> Vec<NodeData> {
        self.stream.as_mut().unwrap().list(None).unwrap_or([].to_vec())
            .iter()
            .map(|data| {
                let split_data: Vec<&str> = data.split_whitespace().collect();
                let date = split_data.iter().copied().skip(5).take(2).collect::<Vec<_>>().join(" ").as_str().to_owned();

                // TODO: Date parsing is fucked, for directories -> %b %d %Y, for files -> %b %d %H:%M
                NodeData {
                    name: split_data[8].to_string(),
                    mode: split_data[0].to_string(),
                    size: split_data[4].parse::<usize>().unwrap(),
                    modification_date: NaiveDateTime::parse_from_str(format!("{} {}", date, "2022 00 00 00").as_str(), "%b %d %Y %H %M %S").unwrap().timestamp()
                }
            })
            .collect()
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn list_node_names(ftp_connection: State<Connection>) -> Vec<String> {
    ftp_connection.connection.lock().unwrap().list_node_names()
}

#[tauri::command]
fn list_nodes(ftp_connection: State<Connection>) -> Vec<NodeData> {
    ftp_connection.connection.lock().unwrap().list_nodes()
}

#[tauri::command]
fn login(ftp_connection: State<Connection>) {
    let mut guard = ftp_connection.connection.lock().unwrap();

    guard.connect("", "");
}

#[tauri::command]
fn change_path(ftp_connection: State<Connection>, path: &str) -> Vec<NodeData> {
    let mut guard = ftp_connection.connection.lock().unwrap();

    guard.change_path(path);
    guard.list_nodes()
}

#[tauri::command]
fn logout(ftp_connection: State<Connection>) {
    let mut guard = ftp_connection.connection.lock().unwrap();

    guard.disconnect();
}


fn main() {
    tauri::Builder::default()
        .manage(Connection { connection: Default::default() })
        .invoke_handler(tauri::generate_handler![list_node_names, list_nodes, login, logout, change_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
