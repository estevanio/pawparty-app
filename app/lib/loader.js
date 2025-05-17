import { PrismaClient } from '@prisma/client';
import { Client } from "@petfinder/petfinder-js"; 

const client = new Client ({apiKey: process.env.APIKEY, secret: process.env.APISECRET});
const prisma = new PrismaClient();

async function updatePhotos(animal){
    try {
        var pics = [];
        const urls = Object.values(animal.photos).flatMap(Object.values);
        const trueUrls = urls.filter(url => typeof url === 'string' && !url.includes('width='));
        for(let i = 0; i < trueUrls.length; i++){
            pics.push({
                animal_id: String(animal.id),
                name: animal.name + " Photo #" + (i+1),
                url: urls[i],
                is_cover: false,
            })
        }
        const updatedPhotos = await prisma.photo.updateMany({
            where: {
                animal_id: String(animal.id),
            },
            data: pics,
        });

        console.log(`Updated ${updatedPhotos.count} photos for animal ${animal.id}`);
        
        return;
    }
    catch (error) {
        console.error('Error updating photos:', error);
        throw error;
    }
}

async function loadPhotos(animal) {
    try {
        var pics = [];
        const urls = Object.values(animal.photos).flatMap(Object.values);
        const trueUrls = urls.filter(url => typeof url === 'string' && !url.includes('width='));
        for(let i = 0; i < trueUrls.length; i++){
            pics.push({
                animal_id: String(animal.id),
                name: animal.name + " Photo #" + (i+1),
                url: urls[i],
                is_cover: false,
            })
        }
        const insertedPhotos = await prisma.photo.createMany({ 
            data: pics
        });
        // Insert data into the "photos" table
  
        console.log(`loaded ${insertedPhotos.count} photos`);
  
        return;
    } catch (error) {
        console.error('Error seeding photos:', error);
        throw error;
    }
}

async function loadAnimals(ani){
    try{
        const animal = new Map(Object.entries(ani));

        const existingAnimal = await prisma.animal.findFirst({
            where:{animal_id: String(animal.get('id'))}
        });

        if(existingAnimal){
            await prisma.animal.update({
                data:{
                    name: animal.get('name'),
                    sex: animal.get('gender'),
                    size: animal.get('size'),
                    age_group: animal.get('age'),
                    species: animal.get('species'),
                    breed: animal.get('breeds').primary,
                    secondary_breed: animal.get('breeds').secondary,
                    primary_color: animal.get('colors').primary,
                    secondary_color: animal.get('colors').secondary,
                    intake_date: new Date(animal.get('published_at')),
                    available: animal.get('status') === 'adoptable',
                    last_updated: new Date(animal.get('status_changed_at')),
                },
                where:{
                    animal_id: String(animal.get('id'))
                }
            });
            if (Object.keys(ani.photos).length !== 0) {                 
                await updatePhotos(ani);
                return;
            }
            else{
                return;
            }
        }
        else{ 
            await prisma.animal.create({
                data:{
                    animal_id: String(animal.get('id')),
                    name: animal.get('name'),
                    sex: animal.get('gender'),
                    size: animal.get('size'),
                    age_group: animal.get('age'),
                    species: animal.get('species'),
                    breed: animal.get('breeds').primary,
                    secondary_breed: animal.get('breeds').secondary,
                    primary_color: animal.get('colors').primary,
                    secondary_color: animal.get('colors').secondary,
                    intake_date: new Date(animal.get('published_at')),
                    available: animal.get('status') === 'adoptable',
                    last_updated: new Date(animal.get('status_changed_at')),
                },
            });
            if (Object.keys(ani.photos).length !== 0) {
                const aniExists = await prisma.animal.findFirst({
                    where:{animal_id: String(animal.get('id'))}
                });
                
                if(aniExists){
                    await loadPhotos(ani);
                }
                return;
            }
            else{
                return;
            }
        }

    } catch (error) {
        console.error('Error Loading animals:', error);
        throw error;
    }
}

async function getAnimals(tp){
    try{
        let page = 1;
        let insertedAnimals = 0;

        do{
            var anilist = await client.animal.search({
                type:tp,
                page,
            });
            anilist.data.animals.forEach(async function(animal){
                await loadAnimals(animal);
                insertedAnimals++;
            });
            page++;
        }while(anilist.data.pagination && anilist.data.total_pages >= page);
        
        console.log(`Loaded ${insertedAnimals} ${tp}`);

        return;
    } catch (error) {
        console.error('Error Loading animals:', error);
        throw error;
    }
}

async function main(){
    await getAnimals("dog");
    await getAnimals("cat");

    await prisma.$disconnect();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to load the database:',
        err,
    );
});

export default main;
