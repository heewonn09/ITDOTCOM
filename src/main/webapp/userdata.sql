CREATE DATABASE IF NOT EXISTS userdata
DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE userdata;

CREATE TABLE IF NOT EXIST user(
	userid char(10) primary key not null,
	userpw char(20) not null,
	username char(10) not null,
	usertel char(13) not null
);