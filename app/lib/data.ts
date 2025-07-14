import { sql } from '@vercel/postgres';
import { PrismaClient, Animal } from '@prisma/client';
import { AnimalData } from './definitions';

const prisma = new PrismaClient();

export async function fetchAnimals() {
  try {
    const animals: Animal[] = await prisma.animal.findMany({
      include: {
        photos: true,
        attributes: true
      },
    });
    return animals;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch animal data.');
  }
}

export async function fetchAnimalById(compare: string) {
  try {
    const animal: AnimalData | null = await prisma.animal.findUnique({
      where: {
        animal_id: compare
      },
      include: {
        photos: true,
        attributes: true
      }
    })
    return animal;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error ('Failed to fetch animal data. Animal ID: ' + compare)
  }
}

export async function fetchAnimalsByMatches(compare: string[]) {
  try {
    const animals: Animal[] = await prisma.animal.findMany({
      where: {
        animal_id: {in: compare}
      },
      include: {
        photos: true,
        attributes: true
      }
    })
    return animals;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch animal data.');
  }
  
}
