import PromiseSocket from 'promise-socket';

const BUFFER_SIZE = 3000000;
const client = net.Socket();
const promiseSocket = new PromiseSocket(client);

const path = 'tmp/cypress-rails-socket-connector';
if (!client.writable) {
  client.connect(path);
}

promiseSocket.write(JSON.stringify(task)).then(() => {
  return promiseSocket.read(BUFFER_SIZE);
}).then(response => {
  const {data, code} = JSON.parse(response.toString('utf-8'));
  if (code !== 0) {
    throw new Error(data);
  }
  return data;
});
