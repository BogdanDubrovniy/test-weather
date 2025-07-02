type DataBaseTypes = 'postgres'

export interface Server {
    port: number;
    socket: {
        address: string;
    };
    sequelize: {
        dialect: DataBaseTypes,
        host: string;
        username: string;
        password: string;
        database: string;
        port: number;
    };
    redis: {
        host: string;
        password: string;
        port: number;
    };
}
