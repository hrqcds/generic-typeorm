class Unauthorized extends Error {
    statusCode = 401;

    constructor(message: string) {
        super(message);
    }
}

export { Unauthorized };
