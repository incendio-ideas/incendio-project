-- AlterTable
ALTER TABLE "Graph" ALTER COLUMN "name" SET DEFAULT 'Unnamed graph';

-- AlterTable
ALTER TABLE "Node" ALTER COLUMN "name" SET DEFAULT 'Unnamed node',
ALTER COLUMN "x" SET DEFAULT 0,
ALTER COLUMN "y" SET DEFAULT 0;
