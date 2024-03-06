import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1709447422871 implements MigrationInterface {
    name = 'Init1709447422871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'CUSTOMER', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mail" ("id" SERIAL NOT NULL, "name" character varying, "email" character varying, "text" text, "status" character varying NOT NULL DEFAULT 'SENDING', CONSTRAINT "PK_5407da42b983ba54c6c62d462d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mail"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
