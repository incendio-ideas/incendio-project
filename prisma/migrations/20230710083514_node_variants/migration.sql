/*
  Warnings:

  - Added the required column `variantId` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "variantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "NodeVariant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NodeVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NodeToNodeVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_NodeToNodeVariant_AB_unique" ON "_NodeToNodeVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_NodeToNodeVariant_B_index" ON "_NodeToNodeVariant"("B");

-- AddForeignKey
ALTER TABLE "_NodeToNodeVariant" ADD CONSTRAINT "_NodeToNodeVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NodeToNodeVariant" ADD CONSTRAINT "_NodeToNodeVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "NodeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
