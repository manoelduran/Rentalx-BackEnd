import upload from '@config/upload';
import fs from 'fs';
import { resolve } from 'path';
import { IStorageProvider } from "../IStorageProvider";


class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file), // remove da primeira pasta
            resolve(`${upload.tmpFolder}/${folder}`, file) // adiciona na segunda
        )
        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const filename = resolve(`${upload.tmpFolder}/${folder}`, file);
        try {
            await fs.promises.stat(filename); // verifica se existe
        } catch (error) {
            return;
        }
        await fs.promises.unlink(filename);
    }
}

export { LocalStorageProvider }