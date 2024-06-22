import { sql } from '@vercel/postgres';

// import {
//   CustomerField,
//   CustomersTableType,
//   InvoiceForm,
//   InvoicesTable,
//   LatestInvoiceRaw,
//   User,
//   Revenue,
// } from './definitions';
import { PrismaClient, Animal } from '@prisma/client';


const prisma = new PrismaClient();

export async function fetchAnimals() {
  try {
    const animals: Animal[] = await prisma.animal.findMany({
      include: {
        photos: true,
        attributes: true,
        shelter: true
      },
    });
    return animals;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch animal data.');
  }
}

