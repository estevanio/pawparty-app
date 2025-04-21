-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_shelter_id_fkey";

-- AlterTable
ALTER TABLE "Animal" ALTER COLUMN "shelter_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "Shelter"("shelter_id") ON DELETE SET NULL ON UPDATE CASCADE;
