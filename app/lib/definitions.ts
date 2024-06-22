// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

import { Prisma } from '@prisma/client'

//Pet type to be depricated soon
export type Pet = {
  id: string;
  name: string, 
  age: number,
  location: string[], 
  img_url: string,   
  breed: string[],
  tags: string[]
}

// 1: Define a type that includes the relation to `Post`
const animalData = Prisma.validator<Prisma.AnimalDefaultArgs>()({
  include: { photos: true, shelter: true, attributes: true },
})

// 2: Define a type that only contains a subset of the scalar fields
const animalBasic = Prisma.validator<Prisma.AnimalDefaultArgs>()({
  select: {
    name: true,
    animal_id: true
  }
})

// 3: This type will include a user and all their posts
export type AnimalData = Prisma.AnimalGetPayload<typeof animalData>
export type AnimalBasic = Prisma.AnimalGetPayload<typeof animalBasic>
