-- CreateTable
CREATE TABLE `gone` (
    `idGone` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(45) NOT NULL,
    `StartDate` DATE NOT NULL,
    `EndDate` DATE NOT NULL,
    `Reason` LONGTEXT NULL,
    `Colour` VARCHAR(9) NOT NULL,

    INDEX `fk_Gone_Users_idx`(`Name`),
    PRIMARY KEY (`idGone`, `Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `Name` VARCHAR(45) NOT NULL,
    `Password` VARCHAR(45) NULL,

    PRIMARY KEY (`Name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `gone` ADD CONSTRAINT `fk_Gone_Users` FOREIGN KEY (`Name`) REFERENCES `users`(`Name`) ON DELETE NO ACTION ON UPDATE NO ACTION;
