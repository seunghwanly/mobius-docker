# 😀 Mobius-docker

## Guideline in KOREAN
<a href="https://www.notion.so/Mobius-Guideline-5915345348974cee92933db99104b18f">**Go to Link😀**</a>

<p align="center">
    <a href="#version">Version</a> •
    <a href="#summary">Summary</a> •
    <a href="#requirements">Requirements</a> •
    <a href="#usage">Usage</a>
</p>

## Version
* mobius-2.4.36
* nCube-thyme-2.3.2

## Summary
<p align='center'>
<img src='https://user-images.githubusercontent.com/22142225/106721084-8b41f980-6647-11eb-8d60-5c4921b38eb2.png' width='800' />
</p>

## Requirements
* MySQL
* Eclipse Mosquitto
* Node.js

## Usage
### :bulb: Using docker Image
    mobius 1.1 version is only avaiable for tas_sample(led, co2)
    now working on SMART RADAR SENSOR

### :bulb: Running the app locally
1. Clone this repository
```terminal
$ git clone https://github.com/seunghwanly/mobius-docker.git
```
2. Change directory to mobius
```terminal
$ cd mobius
```
3. Get dependencies
```terminal
$ npm install
````
4. create conf.json file in mobius-2.4.36
```json
{
    "csebase": "onem2m",
    "cseid": "/onem2m",
    "csebaseport": "7579",
    "csetype": "in",
    "dbhost": "localhost",
    "dbuser": "root",
    "dbpass": !MySQL PASSWORD!, 
    "dbname": "mobiusdb", 
    "superadm_usr": "superadmin",
    "superadm_pwd": "f7c6c12d",
    "pxymqttport": 7580,
    "pxycoapport": 5683,
    "pxywsport": 7577,
    "tsagentport": 7582,
    "mqttbroker": "localhost",
    "secure": "disable",
    "authorization": true,
    "logDir": "./log"  
 }
 
```
5. import database mysqldb.sql
```terminal
$ mysql -u root -p
```
> create and import database
```terminal
mysql> CREATE DATABASE mobiusdb;
mysql> USE mobiusdb;
mysql> SOURCE "path";   // mobius-2.4.36/mobius/mobiusdb.sql path
mysql> SHOW DATABASES;  // check database has created
```
> simple import, if database already exist
```terminal
$ mysql -u root -p mobiusdb < ~/mobius-2.4.36/mobius/mobiusdb.sql
```
6. Check MySQL running
```terminal
$ mysql.server start
```
7. Run concurrently : mobius, nCube, mosquitto
```terminal
$ npm run dev
```

### :bulb: Radar Setting
    ip : localhost
    port : 3105
    interval : 0(no use) and other
