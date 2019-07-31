import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url:
    'mongodb+srv://dbadmin:Yp4IxeBSEQnt25D1@cluster0-5ekbh.mongodb.net/test?retryWrites=true&w=majority',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  useNewUrlParser: true,
};
