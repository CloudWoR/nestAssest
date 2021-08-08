import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'tReportInfoKiosk',
})
export class tReportInfoKiosk {
  @PrimaryColumn()
  ReportID: string;

  @Column()
  ClinicNo: string;

  @Column()
  RISPID: string;

  @Column()
  AccessionNumber: string;

  @Column()
  PatientType: string;

  @Column()
  PatientCName: string;

  @Column()
  PatientEName: string;

  @Column()
  BirthDay: string;

  @Column()
  Sex: string;

  @Column()
  Age: string;

  @Column()
  ModalityType: string;

  @Column()
  Technician: string;

  @Column()
  ReportDoctor: string;

  @Column()
  InhospitalNo: string;

  @Column()
  ReportDoctorImage: string;

  @Column()
  ReportApproverImage: string;

  @Column()
  ReportApprover: string;

  @Column()
  StudyDateTime: string;

  @Column()
  ReportDateTime: string;

  @Column()
  ApproveDateTime: string;

  @Column()
  Representation: string;

  @Column()
  Impression: string;

  @Column()
  IsPositive: string;

  @Column()
  ReportFtpURL: string;

  @Column()
  Description: string;

  @Column()
  ExposalCount: string;

  @Column()
  FilmCount: string;

  @Column()
  jc_charge: string;

  @Column()
  his_charge: string;

  @Column()
  Registrar: string;

  @Column()
  ApplyDept: string;

  @Column()
  ApplyDoctor: string;

  @Column()
  RemoteAccNo: string;

  @Column()
  FilmSpec: string;

  @Column()
  DJTime: string;

  @Column()
  status: string;

  @Column()
  Modality: string;

  @Column()
  Enhance: string;

  @Column()
  JCFS: string;

  @Column()
  ZYH: string;

  @Column()
  CH: string;

  @Column()
  BQ: string;
}
