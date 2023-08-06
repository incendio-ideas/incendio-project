-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_graphId_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_variantId_fkey";

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "NodeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE CASCADE ON UPDATE CASCADE;
