-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'IN',
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT;
