export interface IResult<T> {
    message: string;
    status: "success" | "error";
    data: T;
}
