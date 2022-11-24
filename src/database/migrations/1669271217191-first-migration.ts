import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1669271217191 implements MigrationInterface {
    name = 'firstMigration1669271217191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2"`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "FK_a99b3ca19aedd64a3f069cdeac2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
