-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "projectUpdates" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "supportMessages" BOOLEAN NOT NULL DEFAULT true;
