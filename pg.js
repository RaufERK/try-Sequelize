const { Client } = require('pg');
const client = new Client();

const main = async () => {
  try {
    console.log('STARTTT!!!');
    await client.connect();
    // const res = await client.query('SELECT $1::text as message', [
    //   'Hello world!',
    // ]);
    // console.log(res.rows[0].message); // Hello world!
  } catch (err) {
    console.log('=========ERROR=========');
    console.log(err);
  } finally {
    await client.end();
  }
};
main();
