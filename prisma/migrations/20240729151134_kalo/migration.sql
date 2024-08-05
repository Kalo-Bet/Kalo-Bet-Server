-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('OPEN', 'LOCKED', 'SETTLED', 'VOIDED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PLACED', 'MATCHED', 'SETTLED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Bet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condition" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "betCondition" TEXT NOT NULL,
    "category" TEXT,
    "creatorId" TEXT NOT NULL,
    "winner" TEXT,
    "loser" TEXT,
    "betAnswer" BOOLEAN,
    "betVisibilty" TEXT NOT NULL,
    "isBetAvialable" BOOLEAN NOT NULL,
    "betDeadline" TEXT NOT NULL,
    "opponentStakeAmount" DOUBLE PRECISION,
    "creatorStakeAmount" DOUBLE PRECISION NOT NULL,
    "creatorAllow3partyApproval" BOOLEAN,
    "opponentAllow3partyApproval" BOOLEAN,
    "betApproverMail" TEXT,
    "isBetApprove" BOOLEAN NOT NULL,
    "creatorAnswer" TEXT NOT NULL,
    "opponentAnswer" TEXT,
    "opponentId" TEXT,
    "creatorName" TEXT NOT NULL,
    "opponentName" TEXT,
    "marketPublicKey" TEXT NOT NULL,
    "status" "BetStatus" NOT NULL DEFAULT 'OPEN',
    "liquidity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "winningOutcome" INTEGER,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "betId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "outcome" INTEGER NOT NULL,
    "orderPublicKey" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OddsBet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "condition" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isBetAvialable" BOOLEAN NOT NULL,
    "betCondition" TEXT NOT NULL,
    "category" TEXT,
    "betDeadline" TEXT NOT NULL,
    "forOdd" DOUBLE PRECISION NOT NULL,
    "againstOdd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OddsBet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OddBetStack" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "answer" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "OddBetStack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "betId" TEXT NOT NULL,
    "winnerId" TEXT NOT NULL,
    "loserId" TEXT NOT NULL,
    "betApprovalId" TEXT,
    "title" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userAddress" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bet_marketPublicKey_key" ON "Bet"("marketPublicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderPublicKey_key" ON "Order"("orderPublicKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OddBetStack" ADD CONSTRAINT "OddBetStack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
