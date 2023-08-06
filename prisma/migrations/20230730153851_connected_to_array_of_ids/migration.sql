/*
  Warnings:

  - You are about to drop the `Edge` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "connectedTo" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Edge";
