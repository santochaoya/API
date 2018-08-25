/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : crowdfund

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-27 22:35:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for backer
-- ----------------------------
DROP TABLE IF EXISTS `backer`;
CREATE TABLE `backer` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `username_b` varchar(50) NOT NULL,
  `password_b` varchar(50) NOT NULL,
  `email_b` varchar(255) NOT NULL,
  `location_b` varchar(255) NOT NULL,
  `project_id` int(8) unsigned NOT NULL,
  `amount` float(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of backer
-- ----------------------------
INSERT INTO `backer` VALUES ('1', 'jane', 'jane123', 'jane@uclive.ac.nz', 'CHC', '1', '2000.00');
INSERT INTO `backer` VALUES ('2', 'bob', 'bob123', 'bob@uclive.ac.nz', 'AKL\r\n', '3', '5000.00');
INSERT INTO `backer` VALUES ('3', 'kate', 'kate123', 'kate@uclive.ac.nz', 'CTU', '1', '1000.00');
INSERT INTO `backer` VALUES ('4', 'lili', 'lili123', 'lili@uclive.ac.nz', 'PVG', '5', '5000.00');
INSERT INTO `backer` VALUES ('5', 'lulu', 'lulu123', 'lulu@uclive.ac.nz', 'PVG', '2', '5000.00');
INSERT INTO `backer` VALUES ('6', 'zoe', 'zoe123', 'zoe@uclive.ac.nz', 'SHA', '4', '1500.00');
INSERT INTO `backer` VALUES ('7', 'ray', 'ray123', 'ray@uclive.ac.nz', 'JFK', '4', '1500.00');

-- ----------------------------
-- Table structure for creator
-- ----------------------------
DROP TABLE IF EXISTS `creator`;
CREATE TABLE `creator` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `username_c` varchar(50) NOT NULL,
  `password_c` varchar(50) NOT NULL,
  `email_c` varchar(200) NOT NULL,
  `location_c` varchar(300) NOT NULL,
  `project_id` int(8) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of creator
-- ----------------------------
INSERT INTO `creator` VALUES ('1', 'james', 'james123', 'james@uclive.ac.nz', 'CHC', '1');
INSERT INTO `creator` VALUES ('2', 'bob', 'bob123', 'bob@uclive.ac.nz', 'AKL', '5');
INSERT INTO `creator` VALUES ('3', 'kate', 'kate123', 'kate@uclive.ac.nz', 'CTU', '2');
INSERT INTO `creator` VALUES ('4', 'mei', 'mei123', 'mei@uclive.ac.nz', 'CTU', '4');
INSERT INTO `creator` VALUES ('5', 'shaun', 'shaun123', 'shaun@uclive.ac.nz', 'CTU', '3');

-- ----------------------------
-- Table structure for credit_card
-- ----------------------------
DROP TABLE IF EXISTS `credit_card`;
CREATE TABLE `credit_card` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `card_num` varchar(20) NOT NULL,
  `expired_date` date NOT NULL,
  `security_code` int(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of credit_card
-- ----------------------------
INSERT INTO `credit_card` VALUES ('1', '0082 0534 4353 5543', '2020-02-20', '123');
INSERT INTO `credit_card` VALUES ('2', '6284 0431 5342 5291', '2019-11-29', '285');

-- ----------------------------
-- Table structure for pledge
-- ----------------------------
DROP TABLE IF EXISTS `pledge`;
CREATE TABLE `pledge` (
  `pledge_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `amount` float(12,2) NOT NULL,
  `project_id` int(8) NOT NULL,
  PRIMARY KEY (`pledge_id`),
  UNIQUE KEY `pledge_id` (`project_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pledge
-- ----------------------------
INSERT INTO `pledge` VALUES ('1', '10000.00', '1');
INSERT INTO `pledge` VALUES ('2', '5000.00', '2');
INSERT INTO `pledge` VALUES ('3', '5000.00', '3');
INSERT INTO `pledge` VALUES ('4', '10000.00', '4');
INSERT INTO `pledge` VALUES ('5', '20000.00', '5');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `creationDate` datetime(6) NOT NULL,
  `title` varchar(20) NOT NULL,
  `subtitle` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageUri` varchar(255) NOT NULL,
  `target` float(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('1', '0000-00-00 00:00:00.000000', 'The Sims', 'Sims game', '', '', '10000.00');
INSERT INTO `project` VALUES ('2', '0000-00-00 00:00:00.000000', 'Save life', 'ssave whales', '', '', '15000.00');
INSERT INTO `project` VALUES ('3', '0000-00-00 00:00:00.000000', 'Collect rubbish', 'rubbish recyclling', '', 'http://marketplace.akc.org/puppies/pembroke-welsh-corgi?breed=184&location=&radius=100&page=2&per_page=30', '20000.00');
INSERT INTO `project` VALUES ('4', '2015-12-03 00:00:00.000000', 'creating robot', 'create robot for daily life', 'create some useful robot wokring for people\'s daily life', 'http://marketplace.akc.org/puppies/pembroke-welsh-corgi?breed=184&location=&radius=100&page=2&per_page=30', '50000.00');
INSERT INTO `project` VALUES ('5', '2016-12-11 00:00:00.000000', 'Now Boarding', 'A real-time cooperative pickup-and-deliver game about running your own airline', 'I will be backing this on Kickstarter the minute it goes live', 'https://ksr-ugc.imgix.net/assets/018/037/230/71cc1f5eaa87ae0f27c9a668ec3bb2f8_original.jpg?w=680&fit=max&v=1503511144&auto=format&q=92&s=0a6225b21ac37d214f43f5adf1d72c1b', '20000.00');

-- ----------------------------
-- Table structure for reward
-- ----------------------------
DROP TABLE IF EXISTS `reward`;
CREATE TABLE `reward` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `amount_r` float(12,2) NOT NULL,
  `description_r` varchar(500) NOT NULL,
  `project_id` int(8) NOT NULL,
  PRIMARY KEY (`id`,`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reward
-- ----------------------------
INSERT INTO `reward` VALUES ('1', '5000.00', 'reward refund within 7 working days', '1');
INSERT INTO `reward` VALUES ('2', '4000.00', 'reward refund within 7 working days', '3');
INSERT INTO `reward` VALUES ('3', '400.00', 'reward refund within 7 working days', '4');
