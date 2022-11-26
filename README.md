# Don't explore
Oficially, it's a file explorer with built-in FTP support and unnecessary features. Unoficially, it's a custom-built tool to help my workflow.

## Description
I've been working on another project for a long time already and due to "some reasons" I was often working with files stored remotely through FTP with some other developers adding their code from time to time.
Because of that, I sometimes had to tackle some issues or difficulties that could have been easily avoided by having direct access to "synced" files or just syncing with git repo.

And while working on the second option, that is to migrate to remote repository, I though it'd be fun side project to create custom FTP file explorer that would help me out in keeping files synced under few assumptions:
- Assume that changes to files on FTP server by other developers are done rarely
- Assume we have a need to keep files "in-sync"; that is, whenever I'm working on a file locally, explorer should detect and help with resolving desynced files; something simillar to git merge conflicts.
- Assume we can treat local and remote file structures as mirrored; that is, for example, if certain string `s` is found under path `p` locally, then search should also yield file on remote server accordingly. So if `s` in `p` locally <=> `s` in `p` remotely. Otherwise, we have a syncing issue.

Heavily inspired by one of my previous projects, where using [FUSE](https://github.com/libfuse/libfuse) I created userspace filesystem based on RAID architecture.

## Tech stack
- [Tauri](https://tauri.app/) (Which also means [Rust](https://www.rust-lang.org/))
- [React + TypeScript](reactjs.org)
- [MongoDB](https://www.mongodb.com/)

Written in combination of VSCode + NeoVim.
