-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "participant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participant" ("email", "eventId", "id", "name") SELECT "email", "eventId", "id", "name" FROM "participant";
DROP TABLE "participant";
ALTER TABLE "new_participant" RENAME TO "participant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
