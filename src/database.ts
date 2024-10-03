import { createConnection, Connection } from "typeorm";

// 애플리케이션이 시작되면 즉시 데이터베이스에 연결을 설정
let connection: Connection | null = null;

(async () => {
    try {
        connection = await createConnection();
        console.log("Database connection established");
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error; // 연결 실패 시 애플리케이션 초기화를 중단합니다.
    }
})();

export const getDbConnection = (): Connection => {
    if (!connection) {
        throw new Error("Database connection has not been established yet.");
    }
    return connection;
};