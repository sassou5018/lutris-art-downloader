## Banner Art Downloader for [Lutris](https://lutris.net/)

Simply scans Lutris' local sqlite db (``/home/$USER/.local/share/lutris/pga.db``) for your installed games. Looks up the names on [SteamGridDb](https://www.steamgriddb.com/)'s API and downloads the first matching banner and writes it to `home/$USER/.local/share/lutris/banners/`

> Lutris uses image/jpg or image/jpeg formats only but the selection on
> steamgridDb is limited so i'm downloading PNGs then using
> [jimp](https://www.npmjs.com/package/jimp) to convert them to jpg

**TODO:**
 - [ ] Add Icon Download support
 - [ ] Turn it into an NPX cli tool
 - [ ] Make it a standalone executable

Heavily inspired by [Deytron](https://github.com/Deytron)'s [work](https://github.com/Deytron/lutris-art-downloader) i just had to make it in something worse than python.

