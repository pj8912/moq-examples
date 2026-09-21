// subscriber.js
import * as Moq from "@moq/net";

async function main() {
    // 1. Connect to the same relay
    const connection = await Moq.Connection.connect(
        new URL("https://cdn.moq.dev/anon")
    );

    // 2. Consume the broadcast and subscribe to the "chat" track
    const consumer = connection
        .consume(Moq.Path.from("my-stream"))
        .track("chat")
        .subscribe({ priority: 0 });

    console.log("Subscribed. Waiting for messages...");

    // 3. Read incoming groups in a loop
    for (;;) {
        const group = await consumer.recvGroup();
        if (!group) break; // Stream ended

        const message = await group.readString();
        console.log(`Received: ${message}`);
    }
}

main().catch(console.error);    