import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('register')
export class RegisterEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    lecture: number;

    @Column({ type: 'int' })
    user: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    regDate: Date;

}