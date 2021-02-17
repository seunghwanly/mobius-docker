/*
    Host : localhost / Database : grafana
    Author : github.com/seunghwanly
*/

-- Table structure for pos
DROP TABLE IF EXISTS `pos`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pos`(
`pos_x` int(8),
`pos_y` int(8),
`pos_z` int(8),
`time` integer(15) not null,
PRIMARY KEY(`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for bpm
DROP TABLE IF EXISTS `bpm`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bpm`(
`val` int(8),
`time` integer(15) not null,
PRIMARY KEY(`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for hbr
DROP TABLE IF EXISTS `hbr`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hbr`(
`val` int(8),
`time` integer(15) not null,
PRIMARY KEY(`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for energy
DROP TABLE IF EXISTS `energy`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `energy`(
`val` int(8),
`time` integer(15) not null,
PRIMARY KEY(`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;