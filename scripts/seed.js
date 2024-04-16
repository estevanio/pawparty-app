const { PrismaClient } = require('@prisma/client');

const animals = require('./mock-animals.json');
const attributes = require('./mock-attributes.json');
const shelters = require('./mock-shelters.json');
const photos = require('./mock-photos.json');

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// async function seedUsers() {
//   try {
//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return prisma.user.create({
//           data: {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             password: hashedPassword,
//           },
//         });
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return insertedUsers;
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

async function seedAnimals() {
  try {
    // Insert data into the "animals" table
    const insertedAnimals = await Promise.all(
      animals.map((animal) => prisma.animal.create({
        data: {
          id: animal.id,
          name: animal.name,
          species: animal.species,
          shelter_id: animal.shelter_id,
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
          id: shelter.id,
          name: shelter.name,
          location: shelter.location,
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
    const insertedPhotos = await Promise.all(
      photos.map((photo) => prisma.photo.create({
        data: {
          id: photo.id,
          url: photo.url,
          animal_id: photo.animal_id,
        },
      })),
    );

    console.log(`Seeded ${insertedPhotos.length} photos`);

    return insertedPhotos;
  } catch (error) {
    console.error('Error seeding photos:', error);
    throw error;
  }
}


async function main() {
  await seedShelters();
  await seedAnimals();
  await seedAttributes();
  await seedShelters();
  await seedPhotos();
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});