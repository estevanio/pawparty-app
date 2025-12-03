import { PrismaClient } from '@prisma/client';
import { Client } from "@petfinder/petfinder-js"; 

const client = new Client ({apiKey: process.env.APIKEY, secret: process.env.APISECRET});
const prisma = new PrismaClient();

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

async function main(){
    await delAnimals();

    await prisma.$disconnect();
    
    return;
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to load the database:',
        err,
    );
});

export default main;
