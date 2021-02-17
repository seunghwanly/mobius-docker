# author seunghwanly
# github.com/seunghwanly
# docker pull seunghwanly/mobius_radar_example:1.0.0

# base image : ubuntu
FROM seunghwanly/mobius_radar_example:mobius_thyme_1.0.1

RUN apt-get clean

# listener
WORKDIR /usr/app/radar/mysql_radar
RUN npm install && \ 
    npm install -g nodemon

# socket
WORKDIR /usr/app/radar/tas_radar
RUN npm install && \ 
    npm install -g nodemon

# EXPOSE 3333
WORKDIR /usr/app/radar/mysql_radar
CMD /etc/init.d/mysql start && npm run dev 