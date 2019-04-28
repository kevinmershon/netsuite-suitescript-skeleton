import {ServerResponse} from 'N/https';

interface SlackOptions {
  url:       string,
  message:   string,
  username?: string,
  icon?:     string,
  channel?:  string
}

export type Slack = {
  function post(options: SlackOptions): ServerResponse;
}
