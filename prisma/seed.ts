import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const nodeVariant = await prisma.nodeVariant.create({
    data: {
      name: 'ai-text-generation',
    },
  });

  await prisma.graph.create({
    data: {
      id: 'graph-1',
      name: 'My Board',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      nodes: {
        createMany: {
          data: [
            {
              id: 'node-1',
              name: 'node-1',
              variantId: nodeVariant.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              x: 10,
              y: 20,
            },

            {
              id: 'node-2',
              name: 'node-2',
              variantId: nodeVariant.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              x: 100,
              y: 200,
            },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
