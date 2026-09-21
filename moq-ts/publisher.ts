// publisher.js
import * as Moq from "@moq/net";

async function main() {
    // 1. Connect to a relay (this anon endpoint allows public access)
    const connection = await Moq.Connection.connect(
        new URL("https://cdn.moq.dev/anon")
    );

    // 2. Create a broadcast under the path "my-stream"
    const broadcast = new Moq.Broadcast.Producer();
    connection.publish(Moq.Path.from("my-stream"), broadcast);

    // 3. Create a track named "chat" for text messages
    const track = broadcast.createTrack("chat");

    // 4. Publish messages every second
    let counter = 0;
    setInterval(() => {
        const group = track.appendGroup();
        group.writeString(`Hello from publisher! Message #${counter++}`);
        group.close();
        console.log(`Sent message #${counter}`);
    }, 1000);
}

main().catch(console.error);