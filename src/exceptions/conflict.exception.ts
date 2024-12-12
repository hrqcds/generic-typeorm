class Conflict extends Error {
    statusCode = 409;

    constructor(message: string) {
        super(message);
    }
}

export { Conflict };
