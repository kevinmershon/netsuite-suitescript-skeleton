import {Type as RecordType} from 'N/record';
import {Type as TaskType} from 'N/task';

interface scheduleJobOptions {
  description:         string,
  taskType:            TaskType,
  scriptId:            string,
  deploymentId:        string?,
  params:              object,
  loadingScriptId:     string,
  loadingDeploymentId: string,
  redirectType:        RecordType,
  redirectId:          string | number
}

export type ScheduleJob = {
  function scheduleJob(options: scheduleJobOptions): void;
}
