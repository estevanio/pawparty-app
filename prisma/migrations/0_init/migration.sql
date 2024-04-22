-- CreateTable
CREATE TABLE "Shelter" (
    "shelter_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone_number" TEXT,
    "email" TEXT,
    "website_url" TEXT,
    "opening_hours" TEXT,
    "closing_hours" TEXT,
    "days_of_operation" TEXT,
    "facility_size" TEXT,
    "num_enclosures" INTEGER,
    "cat_facilities" TEXT,
    "dog_facilities" TEXT,
    "staff_names" TEXT,
    "volunteer_opportunities" TEXT,
    "volunteer_coordinator_contact" TEXT,
    "adoption_process_details" TEXT,
    "intake_process_details" TEXT,
    "adoption_fees" TEXT,
    "veterinary_services" TEXT,
    "feeding_schedules" TEXT,
    "exercise_programs" TEXT,
    "adoption_events_schedule" TEXT,
    "educational_programs" TEXT,
    "community_outreach" TEXT,
    "donation_methods" TEXT,
    "donation_collection_points" TEXT,
    "donation_needs" TEXT,
    "licensing_details" TEXT,
    "regulatory_compliance" TEXT,
    "insurance_coverage" TEXT,
    "shelter_history" TEXT,
    "mission_statement" TEXT,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("shelter_id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "animal_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unique_id" TEXT,
    "sex" TEXT,
    "weight" DOUBLE PRECISION,
    "weight_units" TEXT,
    "weight_group" TEXT,
    "birthday" TIMESTAMP(3),
    "age_group" TEXT,
    "species" TEXT NOT NULL,
    "breed" TEXT,
    "secondary_breed" TEXT,
    "primary_color" TEXT,
    "secondary_color" TEXT,
    "intake_date" TIMESTAMP(3) NOT NULL,
    "public_url" TEXT,
    "shelter_id" TEXT NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("animal_id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "animal_id" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("animal_id","attribute")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photo_id" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_cover" BOOLEAN NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_shelter_id_fkey" FOREIGN KEY ("shelter_id") REFERENCES "Shelter"("shelter_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("animal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("animal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

