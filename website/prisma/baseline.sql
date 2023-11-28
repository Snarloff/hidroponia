-- CreateTable
CREATE TABLE "collected_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "topic" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sensors_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tds" TEXT NOT NULL,
    "ph" TEXT NOT NULL,
    "measured_in" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

