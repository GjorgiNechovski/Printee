-------------------------------------------------------------
-- 						Creating Tables                   -- 
-------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `printee`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  `uid` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `printee`.`user` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) DEFAULT NULL,
    `last_name` VARCHAR(255) DEFAULT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `password` VARCHAR(255) DEFAULT NULL,
    `uid` VARCHAR(36) UNIQUE DEFAULT NULL,
    `user_type` ENUM('regular', 'print_studio') NOT NULL
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS `printee`.`product` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) DEFAULT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `unit_price` DECIMAL(13,2) DEFAULT NULL,
    `image_url` VARCHAR(255) DEFAULT NULL,
    `active` BIT DEFAULT 1,
    `units_in_stock` INT(11) DEFAULT NULL,
    `date_created` DATETIME(6) DEFAULT NULL,
    `last_updated` DATETIME(6) DEFAULT NULL,
    `category_id` BIGINT(20) NOT NULL,
    `uid` VARCHAR(36) NOT NULL,
    `user_id` BIGINT(20) DEFAULT NULL,
    `print_studio_id` BIGINT(20) DEFAULT NULL,
    CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`),
    CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_print_studio` FOREIGN KEY (`print_studio_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-------------------------------------------------------------
-- 				  Deafult Testing values                   -- 
-------------------------------------------------------------

INSERT INTO `printee`.`product_category` (`category_name`, `uid`)
VALUES ('BOOKS', UUID()), ('SHIRT', UUID());

INSERT INTO `printee`.`user` (`name`, `email`, `password`, `uid`, `user_type`)
VALUES
    ('PrintStudioUser1', 'user1@printstudio.com', 'password1', UUID(), 'PRINT_STUDIO'),
    ('PrintStudioUser2', 'user2@printstudio.com', 'password2', UUID(), 'PRINT_STUDIO'),
    ('PrintStudioUser3', 'user3@printstudio.com', 'password3', UUID(), 'PRINT_STUDIO');

INSERT INTO `printee`.`user` (`name`, `last_name`, `email`, `password`, `uid`, `user_type`)
VALUES
    ('User1', 'LastName1', 'user1@example.com', 'password1', UUID(), 'REGULAR'),
    ('User2', 'LastName2', 'user2@example.com', 'password2', UUID(), 'REGULAR'),
    ('User3', 'LastName3', 'user3@example.com', 'password3', UUID(), 'REGULAR'),
    ('User4', 'LastName4', 'user4@example.com', 'password4', UUID(), 'REGULAR'),
    ('User5', 'LastName5', 'user5@example.com', 'password5', UUID(), 'REGULAR');

INSERT INTO `printee`.`product` (
  `name`, `description`, `unit_price`, `image_url`, `units_in_stock`, 
  `date_created`, `category_id`, `uid`, `print_studio_id`, `user_id`
)
VALUES 
  ('Book1', 'Learn Book1', 19.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 1, 1),
  ('Book2', 'Learn Book2', 29.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 2, 2),
  ('Book3', 'Learn book3', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 3, 3),
  ('Book4', 'Learn book4', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 1, 4),
  ('Book5', 'Learn book5', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 2, 1),
  ('Book6', 'Learn book6', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 3, 2),
  ('Book7', 'Learn book7', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 1, 3),
  ('Book8', 'Learn book8', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 2, 4),
  ('Book9', 'Learn book9', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 3, 1),
  ('Book10', 'Learn boo105', 24.99, 'assets/images/products/placeholder.png', 100, NOW(), 1, UUID(), 1, 2);


