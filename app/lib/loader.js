const { PrismaClient } = require('@prisma/client');

const animals = require('./animalData.json');

const prisma = new PrismaClient();

async function loadAnimals(){
    try {
        // Insert data into the "animals" table
        const insertedAnimals = await Promise.all(
          animals.map((animal) => prisma.animal.create({
            data: {
              animal_id: animal.Id,
              name: animal.Name,
              species: animal.Species,
              breed: animal.Breed,
              intake_date: new Date(animal.intake_date),
              shelter_id: "43ff709b-2c6d-4087-8179-b61b87bfe36e", //bad practice, this shouldn't be hardcoded
              photos: animal.Photos
            },
          })),
        );
    
        console.log(`Loaded ${insertedAnimals.length} animals`);
    
        return insertedAnimals;
      } catch (error) {
        console.error('Error Loading animals:', error);
        throw error;
      }
}

async function main() {
    await loadAnimals();
  
    await prisma.$disconnect();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to load the database:',
      err,
    );
  });