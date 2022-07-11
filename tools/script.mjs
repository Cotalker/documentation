#!/usr/bin/env zx
import { $, cd } from "zx";
const fs = require('fs');


/* Set context */
/* Create i18n-es files  */

const path = require('path');
const i18nFolder = path.resolve(__dirname,'../i18n/es/docusaurus-plugin-content-docs/current');
const baseFolder = path.resolve(__dirname,'../docs/');

const getFiles = async (basePath) => {
    cd(basePath);
    const files = ((await $`find .`).stdout).split('\n')
    return files;
}

var data = "\nLearn Node.js with the help of well built Node.js Tutorial.\n";

const fileList = await getFiles(baseFolder);

fileList.forEach(file => {
    const base = file.replace('./','');
    if(base === '.') return;
    const baseLength = base.length
    if(!base.substring(baseLength - 4).includes('.')) {
        $`mkdir -p ${i18nFolder}/${base}`
        return;
    }
    else if (base.substring(baseLength - 3) == '.js' ) {
        console.log('AA')
        if (fs.existsSync(`${i18nFolder}/${base}`)) {
                return;
            }
        else {
            $`cp ${baseFolder}/${base} ${i18nFolder}/${base}`;
        }
          
    }
    else {
        if (fs.existsSync(`${i18nFolder}/${base}`)) {
            return;
        }
        else {
            $`cp ${baseFolder}/${base} ${i18nFolder}/${base}`;
            fs.appendFile(`${i18nFolder}/${base}`,data, 'utf8',
                // callback function
                function(err) {     
                    if (err) throw err;
                    // if no error
                    console.log("Data is appended to file successfully.")
            });
        }
    }
});



