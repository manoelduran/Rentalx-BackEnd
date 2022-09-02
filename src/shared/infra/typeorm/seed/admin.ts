import createConnection from '../index';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

const create = async () => {
    const connection = await createConnection("localhost");
    const id = uuidV4();
    const password = await hash("admin", 8);
    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', 'XXXX')
        `
    );
     connection.close;
};

create().then(() => console.log("User admin created!"))

export { create };