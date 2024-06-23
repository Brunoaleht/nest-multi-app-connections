/*
  Warnings:

  - A unique constraint covering the columns `[spotId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `ReservationHistory` (
    `id` VARCHAR(191) NOT NULL,
    `spotId` VARCHAR(191) NOT NULL,
    `ticketKind` ENUM('full', 'half') NOT NULL,
    `status` ENUM('available', 'reserved') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Ticket_spotId_key` ON `Ticket`(`spotId`);

-- AddForeignKey
ALTER TABLE `ReservationHistory` ADD CONSTRAINT `ReservationHistory_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Spot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
