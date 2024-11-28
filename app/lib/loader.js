import { PrismaClient } from '@prisma/client';
import { default as crawler } from '@/app/lib/crawler';
import shelters from './sources.json' assert {type:'json'};

var animal
const prisma = new PrismaClient();

async function loadAnimals(animal,shelter){
    try {
        // Insert data into the "animals" table
        const insertedAnimals = await Promise.all(
          animal.map((animal) => prisma.animal.create({
            data: {
              animal_id: animal.Id,
              name: animal.Name,
              sex: animal.Sex,
              species: animal.Species,
              breed: animal.Breed,
              primary_color: animal.Color,
              intake_date: new Date(animal.IntakeDate),
              shelter_id: shelter.id, //"2d9c9052-e776-4d9f-b74d-4a6a5e394dd4", //bad practice, this shouldn't be hardcoded
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

async function loadPhotos() {
  try {
    // Insert data into the "photos" table
    const insertedPhotos = await prisma.photo.createMany({ 
      data: animal.Photos.map((photos) =>({
        url: photos.url,
        animal_id: photos.animal_id,
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
  for(let z = 0; z < shelters.length; z++){
    animal = await crawler(shelters[z]);
    await loadAnimals(animal,shelters[z]);
    await loadPhotos(animal);
  }

  await prisma.$disconnect();
}
  
main().catch((err) => {
  console.error(
    'An error occurred while attempting to load the database:',
    err,
  );
});

export default main;