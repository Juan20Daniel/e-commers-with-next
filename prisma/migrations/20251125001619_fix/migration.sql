/*
  Warnings:

  - You are about to drop the column `country` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderItems` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId3]` on the table `OrderAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId3` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId2` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItems" DROP CONSTRAINT "OrderItems_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "country",
ADD COLUMN     "countryId" TEXT NOT NULL,
ADD COLUMN     "orderId3" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "orderId",
ADD COLUMN     "orderId2" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrderAddress_orderId3_key" ON "OrderAddress"("orderId3");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId2_fkey" FOREIGN KEY ("orderId2") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_orderId3_fkey" FOREIGN KEY ("orderId3") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
