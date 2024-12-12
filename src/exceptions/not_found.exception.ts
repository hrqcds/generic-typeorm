class NotFound extends Error {
    statusCode = 404;

    constructor(message: string) {
        super(message);
    }
}

export { NotFound };
