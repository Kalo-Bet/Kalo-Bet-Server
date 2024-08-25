/*
  Warnings:

  - The values [OPEN,LOCKED,SETTLED,VOIDED] on the enum `BetStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `betAnswer` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `betApproverMail` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `betCondition` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `betDeadline` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `betVisibilty` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `condition` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `creatorAllow3partyApproval` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `creatorAnswer` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `creatorName` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `creatorStakeAmount` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `isBetApprove` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `isBetAvialable` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `liquidity` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `loser` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `marketPublicKey` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `opponentAllow3partyApproval` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `opponentAnswer` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `opponentId` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `opponentName` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `opponentStakeAmount` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `winner` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `winningOutcome` on the `Bet` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OddBetStack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OddsBet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `minimumBetAmount` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squadMultisigAddress` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Outcome" AS ENUM ('WIN', 'LOSE', 'PENDING');

-- AlterEnum
BEGIN;
CREATE TYPE "BetStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED', 'DISPUTED', 'CANCELLED');
ALTER TABLE "Bet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Bet" ALTER COLUMN "status" TYPE "BetStatus_new" USING ("status"::text::"BetStatus_new");
ALTER TYPE "BetStatus" RENAME TO "BetStatus_old";
ALTER TYPE "BetStatus_new" RENAME TO "BetStatus";
DROP TYPE "BetStatus_old";
ALTER TABLE "Bet" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_betId_fkey";

-- DropForeignKey
ALTER TABLE "OddBetStack" DROP CONSTRAINT "OddBetStack_userId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_betId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropIndex
DROP INDEX "Bet_marketPublicKey_key";

-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "betAnswer",
DROP COLUMN "betApproverMail",
DROP COLUMN "betCondition",
DROP COLUMN "betDeadline",
DROP COLUMN "betVisibilty",
DROP COLUMN "category",
DROP COLUMN "condition",
DROP COLUMN "creatorAllow3partyApproval",
DROP COLUMN "creatorAnswer",
DROP COLUMN "creatorName",
DROP COLUMN "creatorStakeAmount",
DROP COLUMN "currency",
DROP COLUMN "description",
DROP COLUMN "isBetApprove",
DROP COLUMN "isBetAvialable",
DROP COLUMN "liquidity",
DROP COLUMN "loser",
DROP COLUMN "marketPublicKey",
DROP COLUMN "opponentAllow3partyApproval",
DROP COLUMN "opponentAnswer",
DROP COLUMN "opponentId",
DROP COLUMN "opponentName",
DROP COLUMN "opponentStakeAmount",
DROP COLUMN "title",
DROP COLUMN "winner",
DROP COLUMN "winningOutcome",
ADD COLUMN     "minimumBetAmount" DECIMAL(20,8) NOT NULL,
ADD COLUMN     "squadMultisigAddress" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DECIMAL(20,8) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateAt",
DROP COLUMN "userAddress",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ALTER COLUMN "userName" DROP NOT NULL;

-- DropTable
DROP TABLE "History";

-- DropTable
DROP TABLE "OddBetStack";

-- DropTable
DROP TABLE "OddsBet";

-- DropTable
DROP TABLE "Order";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "BetParticipant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "amount" DECIMAL(20,8) NOT NULL,
    "outcome" "Outcome" NOT NULL DEFAULT 'PENDING',
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BetParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetApproval" (
    "id" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "participantId" TEXT,
    "approvedById" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BetApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "betId" TEXT NOT NULL,
    "amount" DECIMAL(20,8) NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetParticipant" ADD CONSTRAINT "BetParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetParticipant" ADD CONSTRAINT "BetParticipant_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetApproval" ADD CONSTRAINT "BetApproval_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetApproval" ADD CONSTRAINT "BetApproval_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "BetParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetApproval" ADD CONSTRAINT "BetApproval_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
