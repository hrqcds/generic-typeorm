import Fastify from "fastify";
import { UserRoutes } from "../../routes/user.routes";
import { typeormPlugin } from "../../plugins/typeorm.plugin";
import { repositoryPlugin } from "../../plugins/repository.plugin";
import { servicePlugin } from "../../plugins/service.plugin";
import { errorPlugin } from "../../plugins/error.plugin";
import { controllerPlugin } from "../../plugins/controller.plugin";
import { AuthenticateRoutes } from "../../routes/authenticate.routes";

const serve = Fastify({
    logger: true,
});

serve.get("/", async () => {
    return "Server is online";
});

serve.register(typeormPlugin);
serve.register(repositoryPlugin);
serve.register(servicePlugin);
serve.register(controllerPlugin);
serve.register(errorPlugin);
serve.register(UserRoutes);
serve.register(AuthenticateRoutes);

export { serve };
