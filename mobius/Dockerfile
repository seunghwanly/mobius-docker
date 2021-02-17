# 1. ubuntu 설치
FROM       ubuntu:16.04
MAINTAINER seunghwanly@gmail.com

RUN apt-get clean

# sudo 설치
RUN apt-get update && apt-get install -y sudo && \
    adduser --disabled-password --gecos "" user \ 
    && echo 'user:user' | chpasswd \ 
    && adduser user sudo \ 
    && echo 'user ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# MySQL
# 2. mysql 설치
ENV DEBIAN_FRONTEND noninteractive
ENV MYSQL_PWD Password789!

RUN apt-get update
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password ${MYSQL_PWD}" | debconf-set-selections
RUN apt-get -y install mysql-server

# 3. mysql import - mobiusdb
COPY . /usr/app
RUN sudo /etc/init.d/mysql start && sleep 5 && \
    mysql -u root -e "CREATE DATABASE mobiusdb; CREATE DATABASE grafana;" && \
    mysql -u root mobiusdb < /usr/app/mobius-2.4.36/mobius/mobiusdb.sql && \
    mysql -u root grafana < /usr/app/radar/mysql_radar/grafanadb.sql
 
# 4. mosquitto 설치
RUN apt-get install -y software-properties-common && \
    rm -rf /var/lib/apt/lists/*
RUN apt-add-repository ppa:mosquitto-dev/mosquitto-ppa && \
    apt-get update && \
    apt-get install --yes mosquitto && \
    apt-get install --yes libmosquitto-dev && \
    apt-get install --yes mosquitto-clients && \
    apt clean

# 5. node js 설치
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

# 6. Mobius 설치
WORKDIR /usr/app/mobius-2.4.36
RUN npm install

# 7. nCube 설치
WORKDIR /usr/app/nCube-Thyme-Nodejs-2.3.2
RUN npm install

# 8. 서버
EXPOSE 3306
WORKDIR /usr/app
CMD /etc/init.d/mysql start && npm run dev 


