import { PrismaClient } from "@prisma/client";
import  { Kafka } from 'kafkajs'

const prisma = new PrismaClient();

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

async function main() {
    const producer = kafka.producer()
    await producer.connect()
   
    while (1) {
       const zapruns =  await prisma.zaprunoutbox.findMany({
            take: 10
        })

        await producer.send({
            topic: 'pending-zaps',
            messages:  zapruns.map(x=> {
                return {
                    value: JSON.stringify(x.zaprunId)
                }
            })
            // { value: 'Hello KafkaJS user!' },
            ,
        })

        await prisma.zaprunoutbox.deleteMany({
            where: {
                id : {
                    in: zapruns.map(x=>x.id)
                }
            }
        })
    }
}

main()