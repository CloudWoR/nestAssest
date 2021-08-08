import { Column, Entity, PrimaryColumn, ViewColumn, ViewEntity } from 'typeorm';
// @Entity({
//   name: 'v_worklist_viewer',
// })
// export class v_worklist_viewer {
//   @PrimaryColumn()
//   date: string;
//   patientType: string;
//   allPatient: number;
//   modality: string;
//   modalityType: string;
//   thenRegister: string;
//   thenStudy: string;
//   thenReport: string;
//   thenAudit: string;
//   avgStudyTime: string;
//   avgReportTime: string;
//   avgAuditTime: string;
//   positiveRate: number;
// }
@ViewEntity({
  expression: `
  SELECT 
	DATE_FORMAT(DJTime, '%Y-%m-%d') as 'date',
	patientType as 'patientType',
	COUNT(id) as 'allPatient',
	modalityType as 'modalityType',
	modality as 'modality',
	SUM(CASE WHEN status = '已登记' THEN 1 ELSE 0 END) as 'thenRegister',
	SUM(CASE WHEN status = '已检查' THEN 1 ELSE 0 END) as 'thenStudy',
	SUM(CASE WHEN status = '已提交' THEN 1 ELSE 0 END) as 'thenReport',
	SUM(CASE WHEN status = '已审核' THEN 1 ELSE 0 END) as 'thenAudit',
	ABS(ROUND(AVG(TIME_TO_SEC(TIMEDIFF(StudyDateTime,DJTime))))) as 'avgStudyTime',
	ABS(ROUND(AVG(TIME_TO_SEC(TIMEDIFF(ReportDateTime,StudyDateTime))))) as 'avgReportTime',
	ABS(ROUND(AVG(TIME_TO_SEC(TIMEDIFF(ApproveDateTime, ReportDateTime))))) as 'avgAuditTime',
	ABS(ROUND(AVG(TIME_TO_SEC(TIMEDIFF(ApproveDateTime, DJTime))))) as 'avgCompletionTime',
	ROUND(SUM(CASE WHEN IsPositive = '阳性' THEN 1 ELSE 0 END) / COUNT(id) * 100, 2) as 'positiveRate'
	from worklist
	GROUP BY 
		DATE_FORMAT(DJTime, '%Y-%m-%d'),
		modality,
    patientType,
    modalityType
	ORDER BY
		DATE_FORMAT(DJTime, '%Y-%m-%d'),
		patientType,
		modalityType,
		modality;`,
})
export class v_worklist_viewer {
  @ViewColumn()
  date: string;
  @ViewColumn()
  patientType: string;
  @ViewColumn()
  allPatient: number;
  @ViewColumn()
  modality: string;
  @ViewColumn()
  modalityType: string;
  @ViewColumn()
  thenRegister: number;
  @ViewColumn()
  thenStudy: number;
  @ViewColumn()
  thenReport: number;
  @ViewColumn()
  thenAudit: number;
  @ViewColumn()
  avgStudyTime: number;
  @ViewColumn()
  avgReportTime: number;
  @ViewColumn()
  avgAuditTime: number;
  @ViewColumn()
  avgCompletionTime: number;
  @ViewColumn()
  positiveRate: number;
}
