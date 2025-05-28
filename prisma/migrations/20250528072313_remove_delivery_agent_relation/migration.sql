-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_deliveryAgentId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_restaurantId_fkey";

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "isOnline" SET DEFAULT false;
