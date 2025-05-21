/*
  Warnings:

  - A unique constraint covering the columns `[animal_id,url]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photo_animal_id_url_key" ON "Photo"("animal_id", "url");
