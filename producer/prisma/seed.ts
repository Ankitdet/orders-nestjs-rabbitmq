/* import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles

  const tag = await prisma.tag.upsert({
    where: { id: 100 },
    update: {},
    create: { "id": 1, "name": "fiction" },
  })

  const tag1 = await prisma.tag.upsert({
    where: { id: 100 },
    update: {},
    create: { "id": 2, "name": "non-fiction" },
  })

  const tag2 = await prisma.tag.upsert({
    where: { id: 100 },
    update: {},
    create: { "id": 3, "name": "science" },
  })
  const tag3 = await prisma.tag.upsert({
    where: { id: 100 },
    update: {},
    create: { "id": 4, "name": "essay" },
  })

  const tag4 = await prisma.tag.upsert({
    where: { id: 100 },
    update: {},
    create: { "id": 5, "name": "inspirational" }
  })

  const post1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      "title": "Sapiens: A Brief History of Humankind",
      "writer": "Yuval Noah Harari",
      "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51aFh0jVRjL._SX329_BO1,204,203,200_.jpg",
      "price": 20.95,
      "tags": {
        "connect": [
          { "tag_id": 2 }, // non-fiction
          { "tag_id": 3 }  // science
        ]
      }
    },
  });

  const post2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      "title": "The Great Gatsby",
      "writer": "F. Scott Fitzgerald",
      "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
      "price": 12.99,
      "tags": {
        "connect": [
          { "tag_id": 1 }, // fiction
          { "tag_id": 5 }  // essay
        ]
      }
    },
  });


  const post3 = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      "title": "The Alchemist",
      "writer": "Paulo Coelho",
      "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51z5HuonCFL._SX324_BO1,204,203,200_.jpg",
      "price": 9.99,
      "tags": {
        "connect": [
          { "tag_id": 1 }, // fiction
          { "tag_id": 4 }  // essay
        ]
      }
    },
  });
  console.log({ post1, post2, post3, tag, tag1, tag2, tag3, tag4 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
 */