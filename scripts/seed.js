const { PrismaClient } = require('@prisma/client');

const animals = require('./mock-animals.json');
const attributes = require('./mock-attributes.json');
const shelters = require('./mock-shelters.json');
const photos = require('./mock-photos.json');

const prisma = new PrismaClient();


async function seedAnimals() {
  try {
    // Insert data into the "animals" table
    const insertedAnimals = await Promise.all(
      animals.map((animal) => prisma.animal.create({
        data: {
          animal_id: animal.uniqueId,
          name: animal.name,
          species: animal.species,
          breed: animal.breed,
          secondary_breed: animal.secondary_breed,
          primary_color: animal.primary_color,
          secondary_color: animal.secondary_color,
          intake_date: new Date(animal.intake_date),
          shelter_id: "43ff709b-2c6d-4087-8179-b61b87bfe36e" //bad practice, this shouldn't be hardcoded
        },
      })),
    );

    console.log(`Seeded ${insertedAnimals.length} animals`);

    return insertedAnimals;
  } catch (error) {
    console.error('Error seeding animals:', error);
    throw error;
  }

}

async function seedAttributes() {
  try {
    // Insert data into the "attributes" table
    const insertedAttributes = await Promise.all(
      attributes.map((attribute) => prisma.attribute.create({
        data: {
          animal_id: attribute.animal_id,
          attribute: attribute.attribute,
        },
      })),
    );

    console.log(`Seeded ${insertedAttributes.length} attributes`);

    return insertedAttributes;
  } catch (error) {
    console.error('Error seeding attributes:', error);
    throw error;
  }
}

async function seedShelters() {
  try {
    // Insert data into the "shelters" table
    const insertedShelters = await Promise.all(
      shelters.map((shelter) => prisma.shelter.create({
        data: {
          name: shelter.name,
          shelter_id: shelter.shelter_id,
          location: shelter.location,
          location: shelter.location,
          phone_number: shelter.phone_number,
          email: shelter.email,
          website_url: shelter.website_url,
          opening_hours: shelter.opening_hours,
          days_of_operation: shelter.days_of_operation,
          cat_facilities: shelter.cat_facilities,
          dog_facilities: shelter.dog_facilities,
          volunteer_opportunities: shelter.volunteer_opportunities,
          volunteer_coordinator_contact: shelter.volunteer_coordinator_contact,
          adoption_process_details: shelter.adoption_process_details,
          adoption_fees: shelter.adoption_fees,
          veterinary_services: shelter.veterinary_services,
          exercise_programs: shelter.exercise_programs,
          educational_programs: shelter.educational_programs,
          community_outreach: shelter.community_outreach,
          donation_methods: shelter.donation_methods,
          donation_collection_points: shelter.donation_collection_points,
          donation_needs: shelter.donation_needs,
          licensing_details: shelter.licensing_details,
          shelter_history: shelter.shelter_history,
          mission_statement: shelter.mission_statement,
        },
      })),
    );

    console.log(`Seeded ${insertedShelters.length} shelters`);

    return insertedShelters;
  } catch (error) {
    console.error('Error seeding shelters:', error);
    throw error;
  }
}

async function seedPhotos() {
  try {
    // Insert data into the "photos" table
    const insertedPhotos = await prisma.photo.createMany({ data: photos.map((photo) => ({
        photo_id: photo.id,
        url: photo.url,
        name: photo.name,
        animal_id: photo.animal_id,
        is_cover: photo.is_cover,
      }))
    });

    console.log(`Seeded ${insertedPhotos.count} photos`);

    return insertedPhotos;
  } catch (error) {
    console.error('Error seeding photos:', error);
    throw error;
  }
}


async function main() {
  await seedShelters();
  await seedAnimals();
  await seedPhotos();
  await seedAttributes();

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});