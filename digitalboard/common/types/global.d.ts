export declare global{
    interface CtxOptions{
        lineWidth:number;
        lineColor:string;
    }

    interface ServerToCLientEvents{
        socket_draw:(newMoves:[number,number][], options:CtxOptions)=>void;
    }

    interface ClientToServerEvents{
        drwa:(moves:[number,number][], options:CtxOptions)=>void;
    }
}