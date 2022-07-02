import { parse } from 'csv-parse';
import fs from 'fs';


interface IRquest {
    file: Express.Multer.File;
}
class ImportCategoryUseCase {
    execute({ file }: IRquest): void {
        const stream = fs.createReadStream(file.path); // stream de leitura para ler o arquivo
        const parseFile = parse();
        stream.pipe(parseFile);
        parseFile.on("data", async (line) => {
            console.log(line);
        })
    };

}

export { ImportCategoryUseCase };