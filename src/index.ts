import "reflect-metadata";
import { serve } from "./servers/http/fastify";

const port = Number(process.env.PORT) || 5555;

(async () => {
    try {
        await serve.listen({ port, host: "0.0.0.0" });
        console.log(`Server listening at http://127.0.0.1:${port}`);
    } catch (error) {
        serve.log.error(error);
        process.kill(process.pid, "SIGTERM");
    }
})();
