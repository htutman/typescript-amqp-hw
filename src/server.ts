import * as Amqp from 'amqp-ts';

// Use Heroku AMQP add-on environment variable
if (!process.env.CLOUDAMQP_URL) {
  console.log('CLOUDAMQP_URL environment variable is not defined, if running locally make sure the env var is set');
  process.exit();
}

const connection = new Amqp.Connection(process.env.CLOUDAMQP_URL);

connection.initialized.then(() => {
  console.log('AMQP connection initialized!');
});
connection.initialized.catch(e => {
  console.log('Error while initializing AMQP connection', e);
});

// declare exchange (create if not exist)
const exchange = connection.declareExchange('testExchange');

// declare queue (create if not exist)
const queue = connection.declareQueue('testQueue');
queue.prefetch(1);

// create binding
queue.bind(exchange);

connection.completeConfiguration().then(() => {
  console.log('AMQP configuration done!');
});

// create a consumer (RPC consumers automatically return the function return value to the replyTo queue)
queue.activateConsumer(
  m => {
    console.log('Message received: ' + m.getContent());

    return new Amqp.Message({ message: 'Hello World!' }, {});
  },
  { noAck: true }
);

// graceful shutdown
process.on('SIGINT', () => shutdownSystem('SIGINT'));
process.on('SIGTERM', () => shutdownSystem('SIGTERM'));

async function shutdownSystem(code?: string): Promise<void> {
  // prevent for calling more than once
  if ((<any>process).closed) {
    return;
  }
  (<any>process).closed = true;

  console.log(`Received ${code}, shutting down...`);

  await queue.stopConsumer();
  await connection.close();

  console.log('Bye');

  process.exit();
}
