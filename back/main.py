from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

connections = set()


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await websocket.accept()
    connections.add(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            response_message = data
            await broadcast_message(response_message, websocket)
    except WebSocketDisconnect:
        connections.remove(websocket)


async def broadcast_message(message: str, sender_websocket: WebSocket):
    for connection in connections:
        if connection != sender_websocket:
            if message == "hello":
                await connection.send_text("Wa 3alaykom esalam")
            else:
                await connection.send_text("bro what you tellin ")
