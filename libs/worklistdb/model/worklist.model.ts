import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'worklist',
})
export class worklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  RISPID: string;
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  AccessionNumber: string;
  @Column()
  PatientCName: string;
  @Column()
  PatientType: string;
  @Column()
  Age: string;
  @Column()
  Sex: string;
  @Column()
  Modality: string;
  @Column()
  ModalityType: string;
  @Column()
  status: string;
  @Column('datetime')
  // 登记时间
  DJTime: string;
  @Column({
    type: 'datetime',
    nullable: true,
  })
  // 检查时间
  StudyDateTime: string;
  @Column({
    type: 'datetime',
    nullable: true,
  })
  // 报告时间
  ReportDateTime: string;
  @Column({
    type: 'datetime',
    nullable: true,
  })
  // 审核时间
  ApproveDateTime: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // 登记员
  Registrar: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // 检查技师
  Technician: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // 报告医生
  ReportDoctor: string;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // 审核医师
  ReportApprover: string;
  @Column({
    type: 'int',
    nullable: true,
  })
  // 是否增强
  Enhance: number;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  // 阴阳性
  IsPositive: string;
}
