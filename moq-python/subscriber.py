import asyncio
import moq

async def main():
    async with moq.Client("https://cdn.moq.dev/anon") as client:
        async for announcement in client.announced("my-stream"):
            # Subscribe to the raw "chat" track
            track = await announcement.broadcast.subscribe_track("chat")
            print("Subscribed. Waiting for messages...")

            # Iterate groups, then frames within each group
            async for group in track:
                async for frame in group:
                    message = frame.payload.decode("utf-8")
                    print(f"Received: {message}")

asyncio.run(main())