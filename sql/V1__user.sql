-- Create customer table
CREATE TABLE `user` (
  `id`                INT(11) NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(50),
  `email`             VARCHAR(100) NOT NULL,
  `profilePic`        VARCHAR(100), 
  `password`          TEXT NOT NULL,
  `age_over`          TINYINT NOT NULL,
  `created_at`        datetime NOT NULL,
  `updated_at`        datetime NOT NULL,
  PRIMARY KEY  (`id`)
);

CREATE TABLE `photo` (
  `id`                INT(11) NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(100) NOT NULL,
  `user`              VARCHAR(100) NOT NULL,
  `description`       VARCHAR(250),
  `created_at`        datetime NOT NULL,
  `updated_at`        datetime NOT NULL,
  PRIMARY KEY  (`id`)
);

CREATE TABLE `tag` (
  `id`                INT(11) NOT NULL AUTO_INCREMENT,
  `name`              VARCHAR(100) NOT NULL,
  `photo_name`        VARCHAR(100) NOT NULL,
  `created_at`        datetime NOT NULL,
  `updated_at`        datetime NOT NULL,
  PRIMARY KEY  (`id`)
);