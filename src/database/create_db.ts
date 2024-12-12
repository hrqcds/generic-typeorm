import { createDatabase, checkDatabase } from "typeorm-extension";
import { AppDataSource } from "./data_source";
(async () => {
    try {
        await AppDataSource.initialize();

        const result = await checkDatabase({
            options: AppDataSource.options,
        });
        if (!result) {
            await createDatabase({
                options: AppDataSource.options,
                ifNotExist: true,
            });

            await AppDataSource.runMigrations();
        } else {
            console.log("Banco de dados com este nome já existe!");

            await AppDataSource.destroy();
            return;
        }

        console.log("Banco de dados criado com sucesso!");
        await AppDataSource.destroy();
    } catch (error) {
        console.error(error);
    }
})();
