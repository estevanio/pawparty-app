import { PrismaClient } from '@prisma/client';
import { Client } from "@petfinder/petfinder-js";

const client = new Client ({apiKey: "tBHcqot1An29KV6N0AEj41m6YBJ8gMp2t1bs9R6BoaDZ8Kmk6F", secret: "icOCF7J1IzCRzHI7nX8XsMPxWOMwCuST3n00pgks"});
const prisma = new PrismaClient();

async function loadOrgs(org){
    try{
        const organization = new Map(Object.entries(org));

        await prisma.organization.create({
            data:{
                // organization_id: String(organization.get('id')),
                name: organization.get('name'),
                email: organization.get('email'),
                phone_number: organization.get('phone'),
                website_url: organization.get('website'),
            },
        });

    } catch (error) {
        console.error('Error Loading organizations:', error);
        throw error;
    }
}

async function getOrgs() {
    try{
        let page = 1;
        let insertedOrgs = 0;

        do{
            var orglist = await client.organization.search({
                page,
            });
            orglist.data.organizations.forEach(async function(org){
                await loadOrgs(org);
                insertedOrgs++;
            });
            page++;
        }while(orglist.data.pagination && orglist.data.total_pages >= page);
        
        console.log(`Loaded ${insertedOrgs} organizations`);

        return;
    } catch (error) {
        console.error('Error Loading organizations:', error);
        throw error;
    }
    
}

async function loadPhotos(animal) {
    try {
        let num = 0;
        const urls = Object.values(animal.photos).flatMap(Object.values);
        for(let i = 0; i < urls.length; i++){
            await prisma.photo.create({ 
                data:{
                    url: urls[i],
                    animal_id: String(animal.id),
                    name: animal.name + " Photo #" + i,
                    is_cover:false,
                }
            });
            num++;
        }
        // Insert data into the "photos" table
  
        console.log(`loaded ${num} photos`);
  
        return;
    } catch (error) {
        console.error('Error seeding photos:', error);
        throw error;
    }
}

async function loadAnimals(ani){
    try{
        const animal = new Map(Object.entries(ani));

        if(prisma.animal.findFirst({where:{animal_id: String(animal.get('id'))}})){
            return;
        }
        else{ 
            await prisma.animal.create({
                data:{
                    animal_id: String(animal.get('id')),
                    name: animal.get('name'),
                    sex: animal.get('gender'),
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
                await loadPhotos(ani);
        
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
    // await getOrgs();
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