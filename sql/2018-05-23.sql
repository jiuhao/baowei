-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: baowei
-- ------------------------------------------------------
-- Server version	5.6.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adm`
--

DROP TABLE IF EXISTS `adm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adm` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '标识ID',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT 'md5处理后的密码',
  `role` varchar(50) NOT NULL COMMENT '角色名',
  `mobile` varchar(20) NOT NULL COMMENT '手机号码',
  `nickname` varchar(255) NOT NULL DEFAULT '' COMMENT '昵称',
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adm`
--

LOCK TABLES `adm` WRITE;
/*!40000 ALTER TABLE `adm` DISABLE KEYS */;
INSERT INTO `adm` VALUES (1,'admin','5f46e2ed1f3f5edd58dcf40fa357bc2c','admin','15700729435','管理员',0,'2018-04-17 07:18:30');
/*!40000 ALTER TABLE `adm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '标题',
  `author_name` varchar(255) NOT NULL COMMENT '作者',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '文章类型 1:政策法规，2:武装部工作，3纠察队建设，4安全知识，5失物招领，6：典型案例',
  `subtitle` varchar(500) NOT NULL DEFAULT '' COMMENT '子标题',
  `subimg` varchar(200) NOT NULL DEFAULT '' COMMENT '文章缩略图',
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '是否删除 0/1',
  `is_public_show` int(1) NOT NULL DEFAULT '0' COMMENT '是否发布到前台 默认是 0，0/1',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后更新时间',
  `publisher_id` int(11) NOT NULL DEFAULT '0' COMMENT '发布者id 来自adm表',
  `content` text NOT NULL COMMENT '文章类容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'政策-则','李明','2018-04-18 16:00:00',1,'描述为政策','/image/8f30b747c6fa371cf06733c4490281e0.jpg',0,1,'2018-05-08 14:45:20',1,'<h1 style=\"text-align: center;\">湖南中医药大学简报</h1><p style=\"text-align: center;\">张三</p><p style=\"text-align: left;\">&nbsp; &nbsp; 11111年，湖南中医学院立世，等。。。。<br></p>'),(2,'政策-则','李明','2018-04-23 16:00:00',1,'描述为政策','',0,1,'2018-05-08 14:22:23',1,'<h1 style=\"text-align: center;\">湖南中医药大学简报</h1><p style=\"text-align: center;\">张三</p><p style=\"text-align: left;\">&nbsp; &nbsp; 1873年，湖南中医学院立世，等。。。。<br></p>'),(3,'政策-则','李明','2018-05-01 11:44:02',1,'描述为政策','/image/8ff905b5d161fe08638e86cececb0fae.jpg',0,1,'2018-05-08 15:22:15',1,'<h1 style=\"text-align: center;\">湖南中医药大学简报</h1><p style=\"text-align: center;\">张三</p><p style=\"text-align: left;\">&nbsp; &nbsp; 1873年，湖南中医学院立世，等。。。。<br></p><p style=\"text-align: left;\">&nbsp;&nbsp;&nbsp;&nbsp;rtrtyryt</p>'),(4,'政策-则','李明','2018-05-01 11:51:45',1,'描述为政策','/image/6d4240def3cde146e8e4febb8b1e0b4e.jpg',0,1,'2018-05-08 14:37:33',1,'<h1 style=\"text-align: center;\">湖南中医药大学简报</h1><p style=\"text-align: center;\">张三</p><p style=\"text-align: left;\">&nbsp; &nbsp; 1873年，湖南中医学院立世，等。。。。<br></p>'),(5,'政策-则','李明','2018-05-01 12:23:03',1,'描述为政策','/image/727a151f512d003fe2d76561b2ad2128.jpg',0,1,'2018-05-08 14:34:53',1,'<h1 style=\"text-align: center;\">湖南中医药大学简报</h1><p style=\"text-align: center;\">张三</p><p style=\"text-align: left;\">&nbsp; &nbsp; 1873年，湖南中医学院立世，等。。。。<br></p>'),(6,'sss','管理员','2018-05-08 15:22:45',5,'ttyutyu','',0,0,'2018-05-08 15:22:45',1,'<p>请输入内容</p><p>123123132</p>');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '文件描述',
  `url` varchar(500) NOT NULL DEFAULT '' COMMENT '文件路径',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_public_show` int(1) DEFAULT '0' COMMENT '是否发布到前台',
  `is_deleted` int(1) DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'等级表1','/table/1.exl','2018-04-27 14:40:59',0,0),(2,'等级表2','/table/1.exl','2018-04-27 14:40:59',0,0),(3,'湖南中医药大学安全卫士.jpg','/image/6d4240def3cde146e8e4febb8b1e0b4e.jpg','2018-05-01 11:51:36',0,0),(4,'湖南中医药大学安全卫士.jpg','/image/727a151f512d003fe2d76561b2ad2128.jpg','2018-05-01 12:22:51',0,0),(5,'湖南中医药大学安全卫士.jpg','/image/744109cb094dad72a52bf16650a0d4a8.jpg','2018-05-08 14:43:15',0,0),(6,'湖南中医药大学安全卫士.jpg','/image/86f4a5f48086da1858c9124c80a5d273.jpg','2018-05-08 14:44:49',0,0),(7,'湖南中医药大学安全卫士.jpg','/image/8f30b747c6fa371cf06733c4490281e0.jpg','2018-05-08 14:45:14',0,0),(8,'《大数据架构和算法实现之路：电商系统的技术实战》.pdf','/image/54684c7052173a10e5d00f19cc353ffa.pdf','2018-05-08 15:06:51',0,0),(9,'校徽.png','/common/00961da0b29ea2208a70c09a17742c23.png','2018-05-08 15:19:51',0,0),(10,'网站首页.doc','/office/c38598632efba1c28b63e767537c7e5c.doc','2018-05-08 15:20:32',0,0),(11,'湖南中医药大学安全卫士.jpg','/image/8ff905b5d161fe08638e86cececb0fae.jpg','2018-05-08 15:22:14',0,0),(12,'点.png','/image/1ff3df37d43c6a40cb3dda77fcfb07d6.png','2018-05-22 09:56:07',0,0),(13,'湖南中医药大学安全卫士.jpg','/image/f8afcfee7c1b2b0eb8eb0cfe17609be3.jpg','2018-05-22 09:56:07',0,0);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父栏目id',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '栏目名',
  `url` varchar(255) NOT NULL COMMENT '路径',
  `is_deleted` int(1) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,0,'机构设置','',0),(2,0,'工作动态','',0),(3,0,'政策法规','',0),(4,0,'安全知识','',0),(5,0,'武装部工作','',0),(6,0,'东塘保卫科','',0),(7,0,'纠察队建设','',0),(8,1,'办公室','',0),(9,1,'治安科','',0),(10,1,'综治科','',0),(11,1,'户政科','',0),(12,1,'消防科','',0),(13,1,'东塘保卫科','',0),(14,1,'军事教研室','',0),(15,3,'国家法律','',0),(16,3,'学校规定','',0),(17,3,'各类政策','',0),(18,4,'防盗防诈骗','',0),(19,4,'消防安全','',0),(20,4,'其他','',0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(500) NOT NULL DEFAULT '' COMMENT '留言',
  `answer` varchar(500) NOT NULL DEFAULT '' COMMENT '回复',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `is_public_show` int(1) NOT NULL DEFAULT '0' COMMENT '是否发布到前台 0/1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
  `answer_time` timestamp NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'你好吗？','好！',0,0,'2018-04-26 14:02:51',NULL),(2,'你真的好嘛？','我真的好呀！',0,0,'2018-04-26 14:02:51',NULL),(3,'hello?','hhhhhhh',0,0,'2018-04-26 14:02:51',NULL),(4,'你好吗？','好！',0,1,'2018-04-26 14:15:39',NULL),(5,'你真的好嘛？','我真的好呀！',0,1,'2018-04-26 14:15:39',NULL),(6,'hello?','hhhhhhh',0,1,'2018-04-26 14:15:39',NULL);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '权限名',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '权限路径',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父权限id',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '权限类型 page/method',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'权限管理','/permission',0,'page'),(2,'权限列表','/permission/list',1,'page'),(3,'角色列表','/permission/role',1,'page'),(4,'角色列表','/permission/adm',1,'page');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL COMMENT 'code 值，例如 admin，edit',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '角色名',
  `permissions` varchar(255) NOT NULL DEFAULT '' COMMENT '该角色所有权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin','管理员',''),(2,'editor','编辑',''),(3,'jcd','纠察队','');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-23 21:14:26
