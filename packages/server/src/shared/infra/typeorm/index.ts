import {
  Connection,
  ConnectionOptions,
  ConnectionOptionsReader,
  createConnection
} from 'typeorm'

const connectionOptionsReader = new ConnectionOptionsReader({
  root: process.cwd()
})

let connection: Connection

const createConnectionTypeorm = async (): Promise<Connection> => {
  if (!connection) {
    const connectionOptions: ConnectionOptions = {
      ...(await connectionOptionsReader.get('default'))
    }
    connection = await createConnection(
      Object.assign(connectionOptions, {
        database:
          process.env.NODE_ENV === 'test'
            ? 'costura_test'
            : connectionOptions.database
      })
    )
  }

  return connection
}

createConnectionTypeorm()
