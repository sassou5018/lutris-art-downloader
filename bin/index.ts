#! /usr/bin/env node
import os from "os";
import fs, { close } from "fs";
import sqlite3 from "sqlite3";
import dotenv from "dotenv";
import con from "axios";
import jimp from "jimp";

dotenv.config();
const axios = con.create({
    baseURL: "https://www.steamgriddb.com/api/v2",
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
    }
});


const db_path = `${os.userInfo().homedir}/.local/share/lutris/pga.db`;

const db = new sqlite3.Database(db_path, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the Lutris database.");
});

db.each("SELECT slug FROM games", async (err, row)=>{
    if(err){
        console.error(err.message);
    }
    const {data} = await axios.get(`/search/autocomplete/${row.slug}`);
    if(data.data.length === 0 || data.data[0].id === undefined){
        return;
    }
    const id = data.data[0].id;
    const {data: grid} = await (await axios.get(`/heroes/game/${id}?mimes=image/png`));
    if(grid.data.length === 0 || grid.data[0].id === undefined){
        return;
    }
    const hero = grid.data[0].url;
    con.get(hero, {responseType: "stream"}).then(res=>{
        console.log("Downloading banner for: ", row.slug);
        res.data.pipe(fs.createWriteStream(`${os.userInfo().homedir}/.local/share/lutris/banners/${row.slug}.png`).on("close",()=>{
            jimp.read(`${os.userInfo().homedir}/.local/share/lutris/banners/${row.slug}.png`, (err, image)=>{
                if(err){
                    console.error(err);
                    return;
                }
                image.write(`${os.userInfo().homedir}/.local/share/lutris/banners/${row.slug}.jpg`);
            })
            fs.rmSync(`${os.userInfo().homedir}/.local/share/lutris/banners/${row.slug}.png`);
            console.log("Done downloading for ", row.slug);

        }));
    }).catch(err=>{
        console.error(err);
    })
});