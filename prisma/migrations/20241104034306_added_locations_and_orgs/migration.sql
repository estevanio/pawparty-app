-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "organization_id" TEXT;

-- CreateTable
CREATE TABLE "Location" (
    "location_id" TEXT NOT NULL,
    "third_party_id" TEXT,
    "street_address" TEXT,
    "city" TEXT NOT NULL,
    "county" TEXT,
    "zip" INTEGER,
    "state" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organization_id" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "mission_statement" TEXT,
    "email" TEXT,
    "staff_names" TEXT,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "opening_hours" TEXT,
    "closing_hours" TEXT,
    "days_of_operation" TEXT,
    "facility_size" TEXT,
    "num_enclosures" INTEGER,
    "cat_facilities" TEXT,
    "dog_facilities" TEXT,
    "location_history" TEXT,
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
    "location_id" TEXT NOT NULL,
    "parent_id" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_location_id_key" ON "Organization"("location_id");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Organization"("organization_id") ON DELETE SET NULL ON UPDATE CASCADE;
