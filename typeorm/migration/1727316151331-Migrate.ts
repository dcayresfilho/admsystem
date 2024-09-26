import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1727316151331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_entity',
            columns: [{
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment', 
                unsigned: true
            }, {
                name: 'name',
                type: 'varchar',
                length: '99'
            }, {
                name: 'password',
                type: 'varchar',
                length: '99'
            }, {
                name: 'email',
                type: 'varchar',
                length: '99',
                isUnique: true 
            }]
        }));

        await queryRunner.createTable(new Table({
            name: 'clientes',
            columns: [{
                name: 'id',
                type: 'INTEGER', 
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                unsigned: true
            }, {
                name: 'name',
                type: 'varchar',
                length: '99',
                isUnique: true
            }, {
                name: 'phone',
                type: 'varchar', 
                length: '11'
            }, {
                name: 'birthday',
                type: 'varchar',
                length: '10'
            }, {
                name: 'local',
                type: 'varchar',
                length: '99'
            }]
        }));

        await queryRunner.createTable(new Table({
            name: 'agendamento_entity',
            columns: [{
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
                unsigned: true
            }, {
                name: 'cliente',
                type: 'varchar',
                length: '99'
            }, {
                name: 'hora',
                type: 'int' 
            }, {
                name: 'valor',
                type: 'int'
            }, {
                name: 'procedimento',
                type: 'varchar',
                length: '99'
            }, {
                name: 'obs',
                type: 'varchar',
                length: '99'
            }, {
                name: 'urlPhoto',
                type: 'varchar',
                length: '99'
            }]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_entity');
        await queryRunner.dropTable('clientes');
        await queryRunner.dropTable('agendamento_entity');
    }
}
