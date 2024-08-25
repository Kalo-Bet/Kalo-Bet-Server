/*
  Warnings:

  - Added the required column `description` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "description" TEXT NOT NULL;
