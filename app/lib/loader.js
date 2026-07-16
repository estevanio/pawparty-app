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
            'hasPic': 'true',
            'filterRadius':{
                'miles': 100,
                'postalCode': 81631
            }
            },
            headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': apiKey
            }
        }
        );
        const response = responses.data;

        if(!response || !response.data || response.data.length === 0){
            console.log(`No ${anitype} data found in the API response.`);
            return;
        }

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

            if (att.type === 'orgs') {
                var templocal = await prisma.location.upsert({
                    where: { location_id: String(att.id) },
                    update: {
                        street_address: att.attributes.street,
                        city: att.attributes.city,
                        zip: att.attributes.postalcode,
                        state: att.attributes.state
                    },
                    create: {
                        location_id: String(att.id),
                        street_address: att.attributes.street,
                        city: att.attributes.city,
                        zip: att.attributes.postalcode,
                        state: att.attributes.state
                    },
                });

                await prisma.organization.upsert({
                    where: { organization_id: String(att.id) },
                    update: {
                        name: att.attributes.name,
                        email: att.attributes.email,
                        phone: att.attributes.phone,
                        adoption_process_details: att.attributes.adoptionProcess,
                        website_url: att.attributes.url,
                        location: templocal,
                    },
                    create: {
                        organization_id: String(att.id),
                        name: att.attributes.name,
                        email: att.attributes.email,
                        phone: att.attributes.phone,
                        adoption_process_details: att.attributes.adoptionProcess,
                        website_url: att.attributes.url,
                        location: templocal,
                    },
                });
            }

            if (att.type === 'locations') {
                var templocal = await prisma.location.upsert({
                    where: { location_id: String(att.id) },
                    update: {
                        street_address: att.attributes.street,
                        city: att.attributes.city,
                        zip: att.attributes.postalcode,
                        state: att.attributes.state
                    },
                    create: {
                        location_id: String(att.id),
                        street_address: att.attributes.street,
                        city: att.attributes.city,
                        zip: att.attributes.postalcode,
                        state: att.attributes.state
                    },
                });

                await prisma.organization.upsert({
                    where: { organization_id: String(att.id) },
                    update: {
                        name: att.attributes.name,
                        phone: att.attributes.phone,
                        website_url: att.attributes.url,
                        location: templocal,
                    },
                    create: {
                        organization_id: String(att.id),
                        name: att.attributes.name,
                        phone: att.attributes.phone,
                        website_url: att.attributes.url,
                        location: templocal,
                    },
                });
            }
        }

        for(const animal of response.data){

            // console.log(`Processing animal ID: ${animal.id}, Name: ${animal.attributes.name}`);

            let birthDay = null;
            if (animal.attributes.birthDate) {
                const parsedDate = new Date(animal.attributes.birthDate);
                if (!isNaN(parsedDate.getTime())) {
                    birthDay = parsedDate;
                }
            }

            let color = null;
            if(animal.relationships.colors){
                color = tempcolor.get(animal.relationships.colors.data[0].id);
            }

            let orga = null;
            if(animal.relationships.orgs){
                orga = await prisma.organization.findUnique({
                    where: { organization_id: String(animal.relationships.orgs.data[0].id) },
                });
            }

            await prisma.animal.upsert({    
                where:{animal_id: String(animal.id)},
                update:{
                    name: animal.attributes.name,
                    sex: animal.attributes.sex,
                    size: animal.attributes.sizeGroup,
                    age_group: animal.attributes.ageGroup,
                    birthday: birthDay,
                    species: anitype,
                    breed: animal.attributes.breedPrimary,
                    primary_color: color,
                    intake_date: new Date(animal.attributes.createdDate),
                    available: tempstatus.get(animal.relationships.statuses.data[0].id) === tempstatus.get("1"),
                    last_updated: new Date(animal.attributes.updatedDate),
                    organization: orga,
                },
                create:{
                    animal_id: String(animal.id),
                    name: animal.attributes.name,
                    sex: animal.attributes.sex,
                    size: animal.attributes.sizeGroup,
                    age_group: animal.attributes.ageGroup,
                    birthday: birthDay,
                    species: anitype,
                    breed: animal.attributes.breedPrimary,
                    primary_color: color,
                    intake_date: new Date(animal.attributes.createdDate),
                    available: tempstatus.get(animal.relationships.statuses.data[0].id) === tempstatus.get("1"),
                    last_updated: new Date(animal.attributes.updatedDate),
                    organization: orga,
                },
            });
            if(animal.relationships.pictures){
                for(const pic of animal.relationships.pictures.data){
                    // console.log("id:", animal.id, "pic url:", temppic.get(pic.id).original.url);
                    
                    await prisma.photo.upsert({
                        where: {
                            animal_id_url: {
                                animal_id: String(animal.id),
                                url: String(temppic.get(pic.id).original.url),
                            }
                        },
                        update: {
                            name: animal.attributes.name + " Photo #" + temppic.get(pic.id).order,
                            is_cover: temppic.get(pic.id).order === 1 ? true : false,
                        },
                        create: {
                            animal_id: String(animal.id),
                            url: String(temppic.get(pic.id).original.url),
                            name: animal.attributes.name + " Photo #" + temppic.get(pic.id).order,
                            is_cover: temppic.get(pic.id).order === 1 ? true : false,
                        }
                    });
                }
            }
            if(animal.attributes.activityLevel){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Level of activity",
                        },
                    },
                    update: {
                        value: animal.attributes.activityLevel,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Level of activity",
                        value: animal.attributes.activityLevel,
                    },
                });
            }

            if(animal.attributes.energyLevel){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Level of energy",
                        },
                    },
                    update: {
                        value: animal.attributes.energyLevel,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Level of energy",
                        value: animal.attributes.energyLevel,
                    },
                });
            }

            if(animal.attributes.exerciseNeeds){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Exercise needs",
                        },
                    },
                    update: {
                        value: animal.attributes.exerciseNeeds,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Exercise needs",
                        value: animal.attributes.exerciseNeeds,
                    },
                });
            }

            if(animal.attributes.fenceNeeds){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Fence needs",
                        },
                    },
                    update: {
                        value: animal.attributes.fenceNeeds,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Fence needs",
                        value: animal.attributes.fenceNeeds,
                    },
                });
            }

            if(animal.attributes.groomingNeeds){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Grooming needs",
                        },
                    },
                    update: {
                        value: animal.attributes.groomingNeeds,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Grooming needs",
                        value: animal.attributes.groomingNeeds,
                    },
                });
            }

            if(animal.attributes.indoorOutdoor){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Indoor/Outdoor",
                        },
                    },
                    update: {
                        value: animal.attributes.indoorOutdoor,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Indoor/Outdoor",
                        value: animal.attributes.indoorOutdoor,
                    },
                });
            }

            if(animal.attributes.newPeopleReaction){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Reaction to new people",
                        },
                    },
                    update: {
                        value: animal.attributes.newPeopleReaction,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Reaction to new people",
                        value: animal.attributes.newPeopleReaction,
                    },
                });
            }

            if(animal.attributes.obedienceTraining){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Obedience training",
                        },
                    },
                    update: {
                        value: animal.attributes.obedienceTraining,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Obedience training",
                        value: animal.attributes.obedienceTraining,
                    },
                });
            }

            if(animal.attributes.ownerExperience){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Owner experience needed",
                        },
                    },
                    update: {
                        value: animal.attributes.ownerExperience,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Owner experience needed",
                        value: animal.attributes.ownerExperience,
                    },
                });
            }

            if(animal.attributes.sheddingLevel){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Level of shedding",
                        },
                    },
                    update: {
                        value: animal.attributes.sheddingLevel,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Level of shedding",
                        value: animal.attributes.sheddingLevel,
                    },
                });
            }

            if(animal.attributes.vocalLevel){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Vocal level",
                        },
                    },
                    update: {
                        value: animal.attributes.vocalLevel,
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Vocal level",
                        value: animal.attributes.vocalLevel,
                    },
                });
            }

            if(animal.attributes.isCatsOk){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is ok with Cats",
                        },
                    },
                    update: {
                        value: "Ok with Cats",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is ok with Cats",
                        value: "Ok with Cats",
                    },
                });
            }

            if(animal.attributes.isDogsOk){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is ok with Dogs",
                        },
                    },
                    update: {
                        value: "Ok with Dogs",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is ok with Dogs",
                        value: "Ok with Dogs",
                    },
                });
            }

            if(animal.attributes.isKidsOk){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is ok with Kids",
                        },
                    },
                    update: {
                        value: "Ok with Kids",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is ok with Kids",
                        value: "Ok with Kids",
                    },
                });
            }

            if(animal.attributes.isHousetrained){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is housetrained",
                        },
                    },
                    update: {
                        value: "Housetrained",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is housetrained",
                        value: "Housetrained",
                    },
                });
            }

            if(animal.attributes.isMicrochipped){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is microchipped",
                        },
                    },
                    update: {
                        value: "Microchipped",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is microchipped",
                        value: "Microchipped",
                    },
                });
            }

            if(animal.attributes.isDeclawed){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is declawed",
                        },
                    },
                    update: {
                        value: "Declawed",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is declawed",
                        value: "Declawed",
                    },
                });
            }

            if(animal.attributes.isSeniorOk){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is ok with seniors",
                        },
                    },
                    update: {
                        value: "Ok with seniors",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is ok with seniors",
                        value: "Ok with seniors",
                    },
                });
            }

            if(animal.attributes.isYardRequired){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is yard required",
                        },
                    },
                    update: {
                        value: "Yard required",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is yard required",
                        value: "Yard required",
                    },
                });
            }

            if(animal.attributes.isCurrentVaccinations){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is current on vaccinations",
                        },
                    },
                    update: {
                        value: "Current on vaccinations",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is current on vaccinations",
                        value: "Current on vaccinations",
                    },
                });
            }

            if(animal.attributes.isFarmAnimalsOk){
                await prisma.attribute.upsert({
                    where: {
                        animal_id_attribute: {
                            animal_id: String(animal.id),
                            attribute: "Is ok with farm animals",
                        },
                    },
                    update: {
                        value: "Ok with farm animals",
                    },
                    create: {
                        animal_id: String(animal.id),
                        attribute: "Is ok with farm animals",
                        value: "Ok with farm animals",
                    },
                });
            }

            if(animal.attributes.isSpecialNeeds){
                if(animal.attributes.specialNeedsDetails){
                    await prisma.specialNeeds.upsert({
                        where: {
                            animal_id: String(animal.id),
                        },
                        update: {
                            details: animal.attributes.specialNeedsDetails,
                        },
                        create: {
                            animal_id: String(animal.id),
                            details: animal.attributes.specialNeedsDetails,
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