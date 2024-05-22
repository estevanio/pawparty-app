/*
  Warnings:

  - You are about to drop the column `unique_id` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "unique_id",
ADD COLUMN     "external_id" TEXT;
