-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(144) NOT NULL,
    "image" TEXT,

    PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id_invitation" SERIAL NOT NULL,
    "name" VARCHAR(144),
    "attending" BOOLEAN NOT NULL DEFAULT false,
    "wish" VARCHAR(144) NOT NULL DEFAULT E'',
    "show" BOOLEAN DEFAULT false,

    PRIMARY KEY ("id_invitation")
);

-- CreateTable
CREATE TABLE "link_youtube" (
    "id_link" SERIAL NOT NULL,
    "url" VARCHAR(144) NOT NULL,

    PRIMARY KEY ("id_link")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation.name_unique" ON "invitation"("name");
