/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.14 : Database - gg
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gg` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `gg`;

/*Table structure for table `dishclass` */

DROP TABLE IF EXISTS `dishclass`;

CREATE TABLE `dishclass` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `classify` varchar(255) COLLATE utf8_bin NOT NULL,
  `number` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `dishclass` */

insert  into `dishclass`(`id`,`classify`,`number`) values (1,'热菜','01'),(2,'凉菜','02'),(3,'米线','03');

/*Table structure for table `dishname` */

DROP TABLE IF EXISTS `dishname`;

CREATE TABLE `dishname` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '菜名',
  `classify` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '品类',
  `number` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '编号',
  `price` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '价格',
  `time` int(10) NOT NULL COMMENT '烹饪时长',
  `picture` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '图片地址',
  `creatDate` timestamp NOT NULL COMMENT '创建时间',
  `status` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `dishname` */

insert  into `dishname`(`id`,`name`,`classify`,`number`,`price`,`time`,`picture`,`creatDate`,`status`) values (1,'葱姜爆炒醉螺','2222','222222','22',4,'','2017-09-02 00:00:00','正在卖'),(2,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-19 00:00:00','正在卖'),(3,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-17 00:00:00','正在卖'),(4,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-18 00:00:00','正在卖'),(5,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-25 00:00:00','正在卖'),(6,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-27 00:00:00','正在卖'),(7,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-22 00:00:00','正在卖'),(8,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(9,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(10,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(11,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-27 00:00:00','正在卖'),(12,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(13,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(14,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(15,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(16,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(17,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(18,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(19,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(20,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(21,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(22,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(23,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(24,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(25,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(26,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(27,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(28,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(29,'葱姜爆炒醉螺','热菜','010001','65',5,'','2017-10-28 00:00:00','正在卖'),(30,'葱姜爆炒醉螺','热菜','010002','65',5,'','2017-10-28 00:00:00','正在卖'),(31,'333','热菜','010003','22',22,'undefined','2017-10-29 00:00:00','正在卖'),(32,'12222','热菜','010004','111',1,'blob:http://localhost:8080/406845c2-8774-44a6-9cbc-4b9585c72ed2','2017-10-28 00:00:00','正在卖'),(33,'3333','热菜','010005','11',11,'blob:http://localhost:8080/d575296b-d15c-4068-a965-568660eae033','2017-10-26 00:00:00','正在卖'),(34,'11','热菜','010006','11',5,'blob:http://localhost:8080/36fe6ae5-f2fb-4a2d-ba0b-d62a89805e3a','2017-10-29 00:00:00','正在卖'),(35,'111111','热菜','010007','1',1,'blob:http://localhost:8080/ed0ffe34-f160-4e80-b486-fdaf312c584c','2017-10-28 00:00:00','正在卖'),(36,'111111','热菜','010007','1',1,'blob:http://localhost:8080/ed0ffe34-f160-4e80-b486-fdaf312c584c','2017-10-29 00:00:00','正在卖'),(37,'111','热菜','010008','9',1,'blob:http://localhost:8080/f036727c-c4a4-4b11-b2f2-bb6fb440d389','2017-10-30 00:00:00','正在卖'),(38,'11','热菜','010009','1',-1,'blob:http://localhost:8080/ae8b89ca-9409-4077-83ba-bc5821eb7c84','2017-10-30 00:00:00','正在卖'),(39,'11','热菜','010010','1',1,'blob:http://localhost:8080/c0b9b69b-8a1b-4ef6-8961-05f55a56ea6c','2017-10-30 00:00:00','正在卖'),(40,'1','热菜','010011','1',1,'blob:http://localhost:8080/1264718b-a9cf-42e1-a870-5e346e3fa1f6','2017-10-30 00:00:00','正在卖'),(41,'11','热菜','010012','11',8,'blob:http://localhost:8080/510ffdac-ec15-47f7-823c-0a3397c32820','2017-10-30 00:00:00','正在卖'),(42,'11','热菜','010013','1',0,'blob:http://localhost:8080/ae11874b-aefb-424f-99de-136f861f9243','2017-10-30 00:00:00','正在卖'),(43,'11','热菜','010014','1',1,'blob:http://localhost:8080/bfdbbaaa-7a4a-4773-a49e-0d79e1353ecc','2017-10-30 00:00:00','正在卖'),(44,'11','热菜','010015','11',11,'blob:http://localhost:8080/06aeb877-838d-4d6a-9c9c-98204dd60cb8','2017-10-29 00:00:00','正在卖'),(45,'11','热菜','010016','1',1,'','2017-10-29 00:00:00','正在卖'),(46,'11','热菜','010017','1',1,'blob:http://localhost:8080/2b1ee0ca-79e0-4466-a68c-59d2476f41e3','2017-10-30 00:00:00','正在卖'),(47,'11','热菜','010018','1',1,'blob:http://localhost:8080/6648e8eb-a60e-4d9a-9733-85099a042189','2017-10-30 00:00:00','正在卖'),(48,'11','热菜','010019','1',1,'blob:http://localhost:8080/15b83403-f7a6-4737-b619-242631e08f1b','2017-10-30 00:00:00','正在卖'),(49,'11','热菜','010020','11',11,'','2017-10-30 00:00:00','正在卖'),(50,'1111','热菜','010021','11',11,'blob:http://localhost:8080/e2d4554a-42cd-4f6f-b2ba-26d0ed11622e','2017-11-01 00:00:00','正在卖'),(51,'3333','热菜','010022','1',1,'blob:http://localhost:8080/324d3fc9-fbee-412f-9678-a81655f36613','2017-11-01 00:00:00','正在卖'),(52,'1111','热菜','010023','11',9,'blob:http://localhost:8080/6f31e50e-5225-46e0-bb1c-da7436456fb2','2017-11-01 00:00:00','正在卖');

/*Table structure for table `orderdetalis` */

DROP TABLE IF EXISTS `orderdetalis`;

CREATE TABLE `orderdetalis` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ordercode` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '订单编码',
  `rank` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '菜品名称',
  `num` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '菜品数量',
  `price` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '菜品价格',
  `status` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `orderdetalis` */

insert  into `orderdetalis`(`id`,`ordercode`,`rank`,`name`,`num`,`price`,`status`) values (1,'d000001','1','333333','1','22','未做'),(2,'d000001','1','222332','1','33','未做'),(3,'d000001','1','222233','1','32','已做');

/*Table structure for table `saleorder` */

DROP TABLE IF EXISTS `saleorder`;

CREATE TABLE `saleorder` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ordercode` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '订单编码',
  `rank` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '桌牌号',
  `orderprice` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '订单总价',
  `ordertime` timestamp NOT NULL COMMENT '下单时间',
  `status` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '订单状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `saleorder` */

insert  into `saleorder`(`id`,`ordercode`,`rank`,`orderprice`,`ordertime`,`status`) values (1,'d000001','1','220','2017-11-01 00:00:00','未付款'),(2,'d000002','2','3000','2017-11-01 00:00:00','未付款'),(3,'d000003','3','3322','2017-11-01 15:41:09','未付款');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
