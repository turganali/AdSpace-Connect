import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/orm/typeorm.module';
import { REPOSITORIES } from '.';
import { ENTITIES_INDEX } from 'src/infrastructure/entities';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([...ENTITIES_INDEX])],
  providers: [...REPOSITORIES],
  exports: [...REPOSITORIES],
})
export class RepositoriesModule {}
