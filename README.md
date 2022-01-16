# 💡 DB Connection Error

after getting clone from this repository, few might had issue with DB connection with below message.
``` bash
[db.connect] No Connection
```
For simple issue, the problem would be the password is not able to create a connection pool through nodejs.

## Checklist
- [ ] Check if the `mysql` is running, in this repo, the basic code runs at `localhost:3306`
- [ ] If you are using MacOS and using `homebrew`, don't be confused you might be using both daemon and mysql simultaneously
- [ ] Check if the `root`'s `plugin` is set to `caching_sha2_password`, update to `mysql_native_password`
- [ ] Lastly, check `conf.json` file if it is updated properly

### Check Network
- in MacOS
``` bash
netstat -anv | grep LISTEN
```
<img width="453" alt="스크린샷 2022-01-16 오후 3 40 41" src="https://user-images.githubusercontent.com/22142225/149650094-63f316d1-5455-435a-81b5-bffc750f02fd.png">

### Check Homebrew(Daemon) and Mysql (only MacOS)
``` bash
brew services
```
<img width="358" alt="스크린샷 2022-01-16 오후 3 25 18" src="https://user-images.githubusercontent.com/22142225/149649782-c60b5751-e6d2-466f-8a33-c7cbb058fce0.png">

then check if the `MySQL` is running, just stop and restart
``` bash
mysql.server stop
```
``` bash
mysql.server start
```
after all, check network again

### Check Mysql settings
- use `mysql` database which is already created when you download MySQL
- write command below in sequence
``` sql
USE mysql;
```
``` sql
SELECT User, Host, plugin FROM USER;
```
Expected result)
``` plain
+------------------+-----------+-----------------------+
| User             | Host      | plugin                |
+------------------+-----------+-----------------------+
| mysql.infoschema | localhost | caching_sha2_password |
| mysql.session    | localhost | caching_sha2_password |
| mysql.sys        | localhost | caching_sha2_password |
| root             | localhost | caching_sha2_password |
+------------------+-----------+-----------------------+
```
Change `caching_sha2_password` to `mysql_native_password`

``` sql
UPDATE USER SET plugin='mysql_native_password' WHERE User='root';
```
``` sql
FLUSH PRIVILEGES;
```

Check the results
<img width="354" alt="스크린샷 2022-01-16 오후 3 33 11" src="https://user-images.githubusercontent.com/22142225/149649933-86c6a5c5-22ea-4dd8-9e7d-162f290d63f1.png">

#### AFTER PROBLEM

when you tried to acces with `mysql -u root -p` and below message occurs, we need to reset the password of root.
``` plain
Access denied for user 'root'@'localhost' (using password: YES)
```
1. stop the Mysql
2. get-in with non-login mode
    ``` bash
    mysqld_safe --skip-grant-tables &
    ```
    then use non-password mode
    ``` bash
    mysql -u root
    ```
3. Make existing password to `null`
    ``` sql
    UPDATE USER SET authentication_string=null WHERE User='root';
    ```
    ``` sql
    FLUSH PRIVILEGES;
    ```
    ``` sql
    exit;
    ```
4. Set new password
    ``` bash
    mysql -u root
    ```
    ``` sql
    USE USER;
    ```
    ``` sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NEW_PASSWORD!';
    ```
    set same password with `conf.json`

<img width="386" alt="스크린샷 2022-01-16 오후 3 42 00" src="https://user-images.githubusercontent.com/22142225/149650126-f260e717-00b3-4312-9e7e-236fc0cd7387.png">


---

<p align="center">
    <a href="#version">Version</a> •
    <a href="#summary">Summary</a> •
    <a href="#requirements">Requirements</a> •
    <a href="#usage">Usage</a>
</p>

---

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

---


## Guideline in KOREAN

[See in **Notion**](https://www.notion.so/Mobius-Guideline-5915345348974cee92933db99104b18f)<br>
[See in **velog**](https://velog.io/@seunghwanly/series/MobiusGuideline)
