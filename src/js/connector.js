import net from 'net';

const DEFAULT_PATH = '/tmp/expose_rails_socket.sock';
let client = null;

const cypressRailsSocketConnect = path => {
  return new Promise((resolve, reject) => {
    console.log('cypressRailsSocketConnect');
    if (!client) {
      const finalPath = path || DEFAULT_PATH;
      console.log('creating connection path ', finalPath, client);
      client = net.createConnection(finalPath)
        .on('connect', () => {
          console.log('Connected to rails using UNIX socket.');
          resolve('response');
        })
        .on('disconnect', () => {
          console.log('Disconnected from rails using UNIX socket.');
          client = null;
          resolve('response');
        })
        .on('error', error => {
          console.log('error', error);
          client = null;
          reject('cannot connect');
        });
    }
    resolve('already connected');
  });
};

export default {
  /**
   * Creates the connection with the UNIX socket
   * */
  cypressRailsSocketConnect,

  /**
   * Sends data using the previously stablished connection
   * */
  cypressRailsSocketConnector(task) {
    return new Promise(resolve => {
      if (!client) throw new Error('not connected');

      // Listener on the response
      client.on('data', response => {
        const {data, code} = JSON.parse(response.toString('utf-8'));
        if (code !== 0) {
          throw new Error(data);
        }
        resolve(data);
      });

      client.write(JSON.stringify(task));
    });
  }
};
