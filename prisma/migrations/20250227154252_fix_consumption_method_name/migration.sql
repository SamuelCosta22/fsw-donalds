/*
  Warnings:

  - You are about to drop the column `consupmtionMethod` on the `Order` table. All the data in the column will be lost.
  - Added the required column `consumptionMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ConsumptionMethod" AS ENUM ('TAKEAWAY', 'DINE_IN');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "consupmtionMethod",
ADD COLUMN     "consumptionMethod" "ConsumptionMethod" NOT NULL;

-- DropEnum
DROP TYPE "ConsupmtionMethod";
