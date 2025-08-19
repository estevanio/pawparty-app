/*
  Warnings:

  - You are about to drop the column `shelter_id` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the `Shelter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_shelter_id_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "shelter_id";

-- DropTable
DROP TABLE "Shelter";
