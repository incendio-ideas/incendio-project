-- CreateTable
CREATE TABLE "users" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "username" STRING(50) NOT NULL,
    "email" STRING(100) NOT NULL,
    "password" STRING(100) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
