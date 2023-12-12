import { JobState } from '../Job/Job.Reducer';
import { TokenState } from '../Token/Token.Reducer';

export interface AppState {
  token: TokenState;
  job: JobState;
}
