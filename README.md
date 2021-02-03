# mobius-docker

## Summary
<p align='center'>
<img src='https://user-images.githubusercontent.com/22142225/106721084-8b41f980-6647-11eb-8d60-5c4921b38eb2.png' width='400' />
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
4. Run concurrently : mobius, nCube, mosquitto
```terminal
$ npm run dev
```

### :bulb: Radar Setting
    ip : localhost
    port : 3105
    interval : 0(no use) and other