import { Migration } from '@mikro-orm/migrations';

export class Migration20201218195655 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null, add column "title" text not null;');
  }

}
