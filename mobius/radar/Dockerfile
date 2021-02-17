# author seunghwanly
# github.com/seunghwanly
# docker pull seunghwanly/mobius_radar_example:1.0.0

# base image : ubuntu
FROM seunghwanly/mobius_radar_example:1.0.0

RUN apt-get clean

# listener
WORKDIR /usr/app/radar/mysql_radar
RUN npm install

# socket
WORKDIR /usr/app/radar/tas_radar
RUN npm install

# EXPOSE 3333
WORKDIR /usr/app/radar/mysql_radar
CMD /etc/init.d/mysql start && npm run dev 