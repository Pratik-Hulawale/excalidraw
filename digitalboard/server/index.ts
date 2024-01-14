import { createServer } from "http";
import express from "express";
import next, { NextApiHandler } from "next";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
    const app = express();
    const server = createServer(app);

    const io = new Server(server, {
        // your configuration options for socket.io if needed
    });

    app.get("/health", async (_, res) => {
        res.send("healthy");
    });

    app.all("*", (req: any, res: any) => nextHandler(req, res));

    io.on("connection", (socket) => {
        console.log("connection");

        socket.on("draw", (moves: [number, number][], options: CtxOptions) => {
            console.log("drawing");
            socket.broadcast.emit("socket_draw", moves, options); // Fix: Change "socket Draw" to "socket_draw"
        });

        socket.on("disconnect", ()=>{
            console.log("client disconnected");
        })
    });

    server.listen(port, () => {
        console.log(`Server is on port ${port}`);
    });
});
