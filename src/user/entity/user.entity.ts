import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LectureEntity } from '../../lecture/entity/lecture.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    ids: number[];
    
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int' })
    isInstructor: number;

    @Column({ type: 'bigint' })
    updateMillis: number;

}