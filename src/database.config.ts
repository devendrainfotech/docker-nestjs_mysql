import { ConnectionOptions } from 'typeorm';
import { TypeormConfigService } from './config/typeorm-config.service';
const config: ConnectionOptions = new TypeormConfigService().createTypeOrmOptions() as ConnectionOptions;
export = config;