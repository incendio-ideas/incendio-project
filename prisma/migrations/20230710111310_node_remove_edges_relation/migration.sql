/*
  Warnings:

  - You are about to drop the column `name` on the `Edge` table. All the data in the column will be lost.
  - You are about to drop the column `nodeId` on the `Edge` table. All the data in the column will be lost.
  - Added the required column `fromId` to the `Edge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toId` to the `Edge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Edge" DROP CONSTRAINT "Edge_nodeId_fkey";

-- AlterTable
ALTER TABLE "Edge" DROP COLUMN "name",
DROP COLUMN "nodeId",
ADD COLUMN     "fromId" TEXT NOT NULL,
ADD COLUMN     "toId" TEXT NOT NULL;
