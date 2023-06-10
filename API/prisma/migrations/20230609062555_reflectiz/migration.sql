-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "domain_info" (
    "id" SERIAL NOT NULL,
    "domain_name" VARCHAR(255) NOT NULL,
    "whois_data" JSON,
    "virustotal_data" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,

    CONSTRAINT "domain_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domain_info_history" (
    "id" SERIAL NOT NULL,
    "domain_id" INTEGER NOT NULL,
    "whois_data" JSON,
    "virustotal_data" JSON,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "domain_info_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "domain_info_domain_name_key" ON "domain_info"("domain_name");

-- AddForeignKey
ALTER TABLE "domain_info_history" ADD CONSTRAINT "domain_info_history_domain_id_fkey" FOREIGN KEY ("domain_id") REFERENCES "domain_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
