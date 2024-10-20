import { PrismaClient } from "@prisma/client";

import  { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })

const prisma = new PrismaClient();

async function main() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'pending-zaps', fromBeginning: true })
      
        await consumer.run({
          eachMessage: async ({ topic, partition, message }) => {
            console.log({
              partition,
              offset: message.offset,
              value: message.value.toString(),
            })

            if(!message) {
                return;
            }
          },
        })
    }

main()