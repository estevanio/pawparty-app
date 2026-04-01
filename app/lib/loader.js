import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const apiKey = process.env.APIKEY;
if (!apiKey) {
throw new Error('APIKEY environment variable is not set');
}

const apiBase = process.env.APIBASE;
if (!apiBase) {
throw new Error('APIBASE environment variable is not set');
}

const prisma = new PrismaClient();

async function getAnimals(anitype) {
    try {
 
        const responses = await axios.get(
            apiBase,
        {
            params: {
            'sort': 'random',
            'animalType': anitype,
            'hasPic': 'true'
            },
            headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': apiKey
            }
        }
        );
        const response = responses.data;

        // console.log(response);
        var temppic = new Map();
        var tempbreed = new Map();
        var tempcolor = new Map();
        var tempstatus = new Map();
        
        for (const att of response.included) {
            
            if (att.type === 'pictures') {
                temppic.set(att.id, att.attributes);
            }

            if (att.type === 'breeds') {
                tempbreed.set(att.id, att.attributes.name);
            }

            if (att.type === 'colors') {
                tempcolor.set(att.id, att.attributes.name);
            }

            if (att.type === 'statuses') {
                tempstatus.set(att.id, att.attributes.name);
            }
        }

        for(const animal of response.data){

            await prisma.animal.upsert({    
                where:{animal_id: String(animal.id)},
                update:{
                    name: animal.attributes.name,
                    sex: animal.attributes.sex,
                    size: animal.attributes.sizeGroup,
                    age_group: animal.attributes.ageGroup,
                    birthday: new Date(animal.attributes.birthDate),
                    species: anitype,
                    breed: animal.attributes.breedPrimary,
                    primary_color: animal.attributes.colors.primary,
                    intake_date: new Date(animal.attributes.createdDate),
                    available: tempstatus.get(animal.relationships.statuses.data[0].id) === tempstatus.get("1"),
                    last_updated: new Date(animal.attributes.updatedDate),
                },
                create:{
                    animal_id: String(animal.id),
                    name: animal.attributes.name,
                    sex: animal.attributes.sex,
                    size: animal.attributes.sizeGroup,
                    age_group: animal.attributes.ageGroup,
                    birthday: new Date(animal.attributes.birthDate),
                    species: anitype,
                    breed: animal.attributes.breedPrimary,
                    primary_color: animal.relationships.colors.data[0] ? tempcolor.get(animal.relationships.colors.data[0].id) : null,
                    intake_date: new Date(animal.attributes.createdDate),
                    available: tempstatus.get(animal.relationships.statuses.data[0].id) === tempstatus.get("1"),
                    last_updated: new Date(animal.attributes.updatedDate),
                },
            });

            for(const pic of animal.relationships.pictures.data){
                // console.log("id:", animal.id, "pic url:", temppic.get(pic.id).original.url);
                if(await prisma.picture.findFirst({
                    where: {
                        animal_id_url: {
                            animal_id: String(animal.id),
                            url: String(temppic.get(pic.id).original.url)
                        }
                    }
                })) {
                    await prisma.picture.update({
                        name: animal.attributes.name + " Photo #" + temppic.get(pic.id).order,
                        is_cover: temppic.get(pic.id).order === 1 ? true : false,
                    })

                }
                else{
                    await prisma.picture.create({
                        data:{
                            animal_id: String(animal.id),
                            url: String(temppic.get(pic.id).original.url),
                            name: animal.attributes.name + " Photo #" + temppic.get(pic.id).order,
                            is_cover: temppic.get(pic.id).order === 1 ? true : false,
                        },
                    });
                }
            }
        }

    return;
    } catch (error) {
            console.error('Error fetching animals:', error);
            throw error;
        }
}
 
async function main() {
 
    await getAnimals('cats');
    await getAnimals('dogs');
 
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