const { Pool, Client } = require('pg');
// pools will use environment variables
// for connection information

const main = async () => {
  try {
    console.log('START===>');
    const client = new Client();
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log(res);
    const res1 = await client.query('SELECT $1::text as message', [
      'Hello world!',
    ]);
    console.log(res1); // Hello world!
    client.end();
  } catch (error) {
    console.log('====ERROR===>');
    console.log(error);
  } finally {
  }
};
main();
