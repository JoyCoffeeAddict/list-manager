-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('INVITATION');

-- CreateTable
CREATE TABLE "ListItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "ListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "organizationId" TEXT,
    "listName" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuer" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" "NotificationType" NOT NULL,
    "content" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListItem_listId_idx" ON "ListItem"("listId");

-- AddForeignKey
ALTER TABLE "ListItem" ADD CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
