#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const storeFile = path.join(__dirname, 'store.db');

let myKey;
let myValue;
let myObject = {};
let command = process.argv[2];

switch (command) {
    case 'add':
        myKey = process.argv[3];
        myValue = process.argv[4];
        if(myKey && myValue){
            fs.readFile(storeFile, (err, data)=>{
                if(!err){
                    myObject = JSON.parse(data.toString());
                    if(Object.keys(myObject).includes(myKey)){
                        console.log('Error duplicate key');
                    } else {
                        myObject[myKey] = myValue;
                        fs.writeFileSync(storeFile, JSON.stringify(myObject));
                        console.log('New Key and Value are added!');
                    }                            
                } else {
                    console.log('Error opening the file');
                }
            });  
        } else {
            console.log('Error Not enough arguments');
        }
       
        break;

    case 'list':
        fs.readFile(storeFile, (err, data)=>{
            if(!err){
                if(data.toString() === '{}'){
                    console.log('Nothing to show');
                } else {
                    console.log(data.toString());                
                }
            } else {
                console.log('Error opening the file');
            }
        });
        break;

    case 'get':
        myKey = process.argv[3];
        fs.readFile(storeFile, (err, data)=>{
            if(!err){
                myObject = JSON.parse(data.toString());
                if (Object.keys(myObject).includes(myKey)){
                    console.log(myKey +' : '+ myObject[myKey]);
                } else {
                    console.log('Error key is not found');
                }
            } else {
                console.log('Error opening the file');
            }
        });
        break;

    case 'remove':
        myKey = process.argv[3];
        fs.readFile(storeFile, (err, data)=>{
            if(!err){
                myObject = JSON.parse(data.toString());
                if (Object.keys(myObject).includes(myKey)){
                    delete myObject[myKey];
                    fs.writeFileSync(storeFile, JSON.stringify(myObject));
                    console.log("Key removed!");
                } else {
                    console.log('Error key is not found');
                }
            } else {
                console.log('Error opening the file'); 
            }
        });
        break;

    case 'clear':
        fs.exists(storeFile, (exists)=>{
            if(exists){
                fs.writeFileSync(storeFile, JSON.stringify(myObject));
                console.log('Data are cleared!');
            } else {
                console.log('Error opening the file'); 
            } 
        });
        break;

    case 'update':
        myKey = process.argv[3];
        myValue = process.argv[4];
        if(myKey && myValue){
            fs.readFile(storeFile, (err, data)=>{
                if(!err){
                    myObject = JSON.parse(data.toString());
                    myObject[myKey] = myValue;
                    fs.writeFileSync(storeFile, JSON.stringify(myObject));
                    console.log('Updated the value of an the key!');                           
                } else {
                    console.log('Error opening the file');
                }
            });  
        } else {
            console.log('Error Not enough arguments');
        }
        break;

    default:
        console.log('command not found please try: add, list, get, remove, clear');
        break;
}