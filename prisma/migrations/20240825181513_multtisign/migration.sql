/*
  Warnings:

  - You are about to drop the column `squadMultisigAddress` on the `Bet` table. All the data in the column will be lost.
  - Added the required column `squadMultisigAddress` to the `BetParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "squadMultisigAddress";

-- AlterTable
ALTER TABLE "BetParticipant" ADD COLUMN     "squadMultisigAddress" TEXT NOT NULL;
