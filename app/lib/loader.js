import { PrismaClient } from '@prisma/client';
import { Client } from "@petfinder/petfinder-js"; 

const client = new Client ({apiKey: process.env.APIKEY, secret: process.env.APISECRET});
const prisma = new PrismaClient();

async function upsertPhotos(animal) {
    try {
        const urls = Object.values(animal.photos).flatMap(Object.values);
        const trueUrls = urls.filter(url => typeof url === 'string' && !url.includes('width='));
        for(let i = 0; i < trueUrls.length; i++){
            await prisma.photo.upsert({
                where: {
                    animal_id_url: {
                        animal_id: String(animal.id),
                        url: trueUrls[i],
                    }
                },
                update: {
                    name: animal.name + " Photo #" + (i + 1),
                    is_cover: false,
                },
                create: {
                    animal_id: String(animal.id),
                    name: animal.name + " Photo #" + (i + 1),
                    url: trueUrls[i],
                    is_cover: false,
                },
            });
        }
        console.log(`Loaded ${trueUrls.length} photos for animal ${animal.id} (${animal.name})`);
        return;
    } catch (error) {
        console.error('Error with photos:', error);
        throw error;
    }
}

async function delAnimals() {
    try {
        const animalsToDelete = await prisma.animal.findMany({
            where: { 
                OR: [
                    { available:  null}, 
                    { available: false }
                ]},
            select: { animal_id: true }
        });
        const animalIds = animalsToDelete.map(a => a.animal_id);

        await prisma.attribute.deleteMany({
            where: { animal_id: { in: animalIds } }
        });

        await prisma.photo.deleteMany({
            where: { animal_id: { in: animalIds } }
        });

        const anilist = await prisma.animal.deleteMany({
            where: {
                OR: [
                    { available:  null}, 
                    { available: false }
                ]
            },
        });
        console.log(`Removed ${anilist.count} animals`);

        return;
    } catch (error) {
        console.error('Error removing animals:', error);
        throw error;
    }
}

async function loadAnimals(ani){
    try{
        const animal = new Map(Object.entries(ani));
        
        await prisma.animal.upsert({    
            where:{animal_id: String(animal.get('id'))},
            update:{
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
            create:{
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
                await upsertPhotos(ani);
                return
            }
            else{
                return;
            }
        }
        else{
            return;
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
    await delAnimals();

    await prisma.$disconnect();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to load the database:',
        err,
    );
});

export default main;
