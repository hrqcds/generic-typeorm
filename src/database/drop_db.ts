import { checkDatabase, dropDatabase } from "typeorm-extension";
import { AppDataSource } from "./data_source";
(async () => {
    try {
        await AppDataSource.initialize();

        const result = await checkDatabase({
            options: AppDataSource.options,
        });

        if (result) {
            await dropDatabase({
                options: AppDataSource.options,
                ifExist: true,
            });
        } else {
            console.log("Não existe banco de dados com este nome!");

            await AppDataSource.destroy();
            return;
        }

        console.log("Banco de dados deletado com sucesso!");
        await AppDataSource.destroy();
    } catch (error) {
        console.error(error);
    }
})();
