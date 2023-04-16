import { getRequest, ReqOptions } from './common-requests';
import { IRanking } from '../models/interfaces';
import { ProgrammingTopic } from '../models/enums';

const API_DOMAIN = '/ranking';

export function getRanking(options?: ReqOptions) {
  return getRequest<IRanking[]>({ url: API_DOMAIN, options });
}

export async function getRankingData(options?: ReqOptions) {
  return getRanking(options).then(({ data }) => data);
}

export function getTopicRanking(topic: ProgrammingTopic, options?: ReqOptions) {
  return getRequest<IRanking[]>({ url: `${API_DOMAIN}/topic/${topic}`, options });
}

export async function getTopicRankingData(topic: ProgrammingTopic, options?: ReqOptions) {
  return getTopicRanking(topic, options).then(({ data }) => data);
}
