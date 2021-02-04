# 😀 Mobius-docker

## Notion
<em><b>02.03.21 done for parsing</b></em><br/>
<em><b>TODO : load to Database</b></em>

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
4. Check MySQL running
```terminal
$ mysql.server start
```
5. Run concurrently : mobius, nCube, mosquitto
```terminal
$ npm run dev
```

### :bulb: Radar Setting
    ip : localhost
    port : 3105
    interval : 0(no use) and other
