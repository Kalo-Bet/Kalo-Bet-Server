/*
  Warnings:

  - Added the required column `betName` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "betName" TEXT NOT NULL;
