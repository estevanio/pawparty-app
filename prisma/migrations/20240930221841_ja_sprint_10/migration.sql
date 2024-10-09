/*
  Warnings:

  - You are about to drop the column `external_id` on the `Animal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "external_id",
ADD COLUMN     "available" BOOLEAN,
ADD COLUMN     "last_updated" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "organization_source" TEXT,
ADD COLUMN     "third_party_id" TEXT;

-- CreateTable
CREATE TABLE "SpecialNeeds" (
    "special_needs_id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "special_need" TEXT NOT NULL,

    CONSTRAINT "SpecialNeeds_pkey" PRIMARY KEY ("special_needs_id")
);

-- AddForeignKey
ALTER TABLE "SpecialNeeds" ADD CONSTRAINT "SpecialNeeds_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("animal_id") ON DELETE RESTRICT ON UPDATE CASCADE;
