import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name: 'created_at', type:'time without time zone'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', type:'time with time zone', nullable:true})
  updatedAt: Date
}
