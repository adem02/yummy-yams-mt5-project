import bcrypt from 'bcrypt';

export class PasswordService {
    public static async hash(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, 10);
    }

    public static async check(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}