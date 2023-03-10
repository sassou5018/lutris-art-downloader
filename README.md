## Banner Art Downloader for [Lutris](https://lutris.net/)

Simply scans Lutris' local sqlite db (``/home/$USER/.local/share/lutris/pga.db``) for your installed games. Looks up the names on [SteamGridDb](https://www.steamgriddb.com/)'s API and downloads the first matching banner and writes it to `home/$USER/.local/share/lutris/banners/`

> Lutris uses image/jpg or image/jpeg formats only but the selection on
> steamgridDb is limited so i'm downloading PNGs then using
> [jimp](https://www.npmjs.com/package/jimp) to convert them to jpg

### How to use:
Grab and API Key from [steamGridDb's API](https://www.steamgriddb.com/api/v2).
Add a .env file with the variable API_KEY

    API_KEY=xxxxxxxxxxxxxxxx
    
install the dependencies using npm or yarn

    npm i
    or
    yarn
build the app and run or just run it in development mode using nodemon

    npm start //to build and start
    or
    npm run dev //to run in development

#### TODO:
 - [ ] Add Icon Download support
 - [ ] Turn it into an NPX cli tool
 - [ ] Make it a standalone executable

Heavily inspired by [Deytron](https://github.com/Deytron)'s [work](https://github.com/Deytron/lutris-art-downloader) i just had to make it in something worse than python.

