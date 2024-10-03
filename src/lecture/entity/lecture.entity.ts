import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lecture')
export class LectureEntity {
    @PrimaryGeneratedColumn()
    id: number;

    ids: number[];
    
    @Column({ type: 'int' })
    lectureId: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'int' })
    instructor: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'int' })
    capacity: number;

    @Column({ type: 'int'})
    current: number;

    @Column({ type: 'int' })
    isSpecial: number;

    @Column({ type: 'bigint' })
    updateMillis: number;

}