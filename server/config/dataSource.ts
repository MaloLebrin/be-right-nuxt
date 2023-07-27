import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { DataSource } from 'typeorm'
import { dataBaseConfig } from './ormconfig'

export function createAppSource() {
  const NODE_ENV = process.env.NODE_ENV
  let connectionsOptions: PostgresConnectionOptions

  if (NODE_ENV === 'production') {
    connectionsOptions = {
      ...dataBaseConfig.production as unknown as PostgresConnectionOptions,
    }
  } else if (NODE_ENV === 'test') {
    connectionsOptions = {
      ...dataBaseConfig.test as unknown as PostgresConnectionOptions,
    }
  } else {
    connectionsOptions = {
      ...dataBaseConfig.dev as unknown as PostgresConnectionOptions,
      name: 'default',
    }
  }

  return new DataSource({
    ...connectionsOptions,
  })
}

const AppSource = createAppSource()

export default AppSource
