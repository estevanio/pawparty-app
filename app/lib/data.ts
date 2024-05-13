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
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function fetchAnimals() {
  try {
    const animals = await prisma.animal.findMany();
    return animals;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch animal data.');
  }
}
