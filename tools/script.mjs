#!/usr/bin/env zx
import { $, cd } from "zx";
const fs = require('fs');

const path = require('path');
const i18nFolder = path.resolve(__dirname,'../i18n/es/docusaurus-plugin-content-docs/current');
const baseFolder = path.resolve(__dirname,'../docs/');
const baseBlogFolder = path.resolve(__dirname,'../blog/');
const i18nBlogFolder = path.resolve(__dirname,'../i18n/es/docusaurus-plugin-content-blog/');

var caution = "\n:::caution Advertencia\nEsta página aún no se encuentra traducida al español.\n:::";

const getFiles = async (basePath) => {
    cd(basePath);
    const files = ((await $`find .`).stdout).split('\n')
    return files;
}

const insertCaution = async (data , file) => {
    var formatedData = data.split("\n");
    fs.openSync(file, "a");
    let title = false;
    for (let i = 0; i < formatedData.length; i++){
        if ( i == 0 && !title  ) title = true;
        fs.appendFileSync(file, formatedData[i]+'\n');
        if( i > 1 && formatedData[i] == '---' && title ){
            title = false;
            fs.appendFileSync(file, caution+'\n');
        }
    }
}

const fileList = await getFiles(baseFolder);

fileList.forEach( async file => {
    const base = file.replace('./','');
    if(base === '.') return;
    const baseLength = base.length;
    if(!base.substring(baseLength - 4).includes('.')) {
        await $`mkdir -p ${i18nFolder}/${base}`
        return;
    }
    else if (base.substring(baseLength - 3) == '.js' ) {
        if (fs.existsSync(`${i18nFolder}/${base}`)) {
                return;
            }
        else {
            await $`cp ${baseFolder}/${base} ${i18nFolder}/${base}`;
        }
          
    }
    else {
        if (fs.existsSync(`${i18nFolder}/${base}`)) {
            return;
        }
        else {
            const baseFile = `${baseFolder}/${base}`
            const newFile = `${i18nFolder}/${base}`
            fs.readFile( baseFile , "utf-8", (err, data) => {insertCaution(data,newFile)})
        }
    }
});

const blogList = await getFiles(baseBlogFolder);

blogList.forEach( async file => {
    const base = file.replace('./','');
    if(base === '.') return;
    if (fs.existsSync(`${i18nBlogFolder}/${base}`)) {
        return;
    }
    else {
        const baseFile = `${baseBlogFolder}/${base}`
        const newFile = `${i18nBlogFolder}/${base}`
        fs.readFile( baseFile , "utf-8", (err, data) => {insertCaution(data,newFile)});
    }
});
