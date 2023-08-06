/*
  Warnings:

  - You are about to drop the `_NodeToNodeVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_NodeToNodeVariant" DROP CONSTRAINT "_NodeToNodeVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_NodeToNodeVariant" DROP CONSTRAINT "_NodeToNodeVariant_B_fkey";

-- DropTable
DROP TABLE "_NodeToNodeVariant";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "NodeVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
