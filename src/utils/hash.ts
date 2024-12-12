/* eslint-disable @typescript-eslint/no-unused-vars */
import argon2 from "argon2";

interface IResultHash {
    value: string | null;
    status: boolean;
}

async function Hash(text: string): Promise<IResultHash> {
    try {
        const hash = await argon2.hash(text);

        return { value: hash, status: true };
    } catch (err) {
        return {
            value: "Error ao fazer hash da senha",
            status: false,
        };
    }
}

async function Verify(hash: string, text: string): Promise<boolean> {
    try {
        if (await argon2.verify(hash, text)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export { Hash, Verify };
