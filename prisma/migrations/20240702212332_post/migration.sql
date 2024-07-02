-- CreateTable
CREATE TABLE "gone" (
    "idGone" SERIAL NOT NULL,
    "StartDate" DATE NOT NULL,
    "EndDate" DATE NOT NULL,
    "Reason" TEXT,
    "Colour" VARCHAR(9),
    "Name" VARCHAR(45) NOT NULL,

    CONSTRAINT "gone_pkey" PRIMARY KEY ("idGone","Name")
);

-- CreateTable
CREATE TABLE "users" (
    "Name" VARCHAR(45) NOT NULL,
    "Password" VARCHAR(45),

    CONSTRAINT "users_pkey" PRIMARY KEY ("Name")
);

-- CreateIndex
CREATE INDEX "fk_Gone_Users_idx" ON "gone"("Name");

-- AddForeignKey
ALTER TABLE "gone" ADD CONSTRAINT "fk_Gone_Users" FOREIGN KEY ("Name") REFERENCES "users"("Name") ON DELETE NO ACTION ON UPDATE NO ACTION;
