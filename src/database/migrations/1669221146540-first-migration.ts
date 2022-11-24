import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1669221146540 implements MigrationInterface {
    name = 'firstMigration1669221146540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "userName" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" DEFAULT 'USER', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "dateAdmission" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "programs" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "userId" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d43c664bcaafc0e8a06dfd34e05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "programs_students" ("programsId" integer NOT NULL, "studentsId" integer NOT NULL, CONSTRAINT "PK_d22bdb519e458e3350126775571" PRIMARY KEY ("programsId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_867bc852eae8e0b735f526ddb3" ON "programs_students" ("programsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef1105d3ed3176495dbf62f962" ON "programs_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "programs_students" ADD CONSTRAINT "FK_867bc852eae8e0b735f526ddb30" FOREIGN KEY ("programsId") REFERENCES "programs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "programs_students" ADD CONSTRAINT "FK_ef1105d3ed3176495dbf62f9625" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs_students" DROP CONSTRAINT "FK_ef1105d3ed3176495dbf62f9625"`);
        await queryRunner.query(`ALTER TABLE "programs_students" DROP CONSTRAINT "FK_867bc852eae8e0b735f526ddb30"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef1105d3ed3176495dbf62f962"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_867bc852eae8e0b735f526ddb3"`);
        await queryRunner.query(`DROP TABLE "programs_students"`);
        await queryRunner.query(`DROP TABLE "programs"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
