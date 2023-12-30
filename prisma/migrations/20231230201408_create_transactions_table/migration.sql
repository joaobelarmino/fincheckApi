-- CreateTable
CREATE TABLE "transactions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "categoy_id" UUID,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "transaction_types" NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoy_id_fkey" FOREIGN KEY ("categoy_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;