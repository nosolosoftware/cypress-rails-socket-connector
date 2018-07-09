import net from 'net';

const DEFAULT_PATH = '/tmp/expose_rails_socket.sock';
let client = null;

export default {
  /**
   * Creates the connection with the UNIX socket
   * */
  cypressRailsSocketConnect(path) {
    if (!client) {
      const finalPath = path || DEFAULT_PATH;
      console.log('creating connection path ', path, path);
      client = net.createConnection(finalPath)
        .on('connect', () => {
          console.log('Connected to rails using UNIX socket.');
        })
        .on('disconnect', () => {
          console.log('Disconnected from rails using UNIX socket.');
        })
        .on('error', error => {
          console.log(error);
          console.error('Rails socket connector not active.');
          throw new Error('Rails socket connector not active');
        });
    }
    return null;
  },

  /**
   * Sends data using the previously stablished connection
   * */
  cypressRailsSocketConnector(task) {
    return new Promise(resolve => {
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
