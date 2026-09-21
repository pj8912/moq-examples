import asyncio
import moq

async def main():
    # 1. Connect to a relay
    async with moq.Client("https://cdn.moq.dev/anon") as client:
        # 2. Create a broadcast under the path "my-stream"
        broadcast = client.create_broadcast("my-stream")

        # 3. Create a raw track named "chat" for text messages
        chat = broadcast.publish_track("chat")

        # 4. Publish messages every second
        counter = 0
        try:
            while True:
                message = f"Hello from publisher! Message #{counter}"
                chat.write_frame(message.encode("utf-8"), timestamp_us=counter * 1_000_000)
                print(f"Sent message #{counter}")
                counter += 1
                await asyncio.sleep(1)
        except asyncio.CancelledError:
            pass
        finally:
            chat.finish()
            broadcast.finish()

asyncio.run(main())