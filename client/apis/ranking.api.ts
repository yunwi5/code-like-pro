import { getRequest } from './requests.api';
import { IRanking } from '../models/interfaces';
import { ProgrammingTopic } from '../models/enums';

const API_DOMAIN = '/ranking';

export function getRanking() {
    return getRequest<IRanking[]>({ url: API_DOMAIN });
}

export function getTopicRanking(topic: ProgrammingTopic) {
    return getRequest<IRanking[]>({ url: `${API_DOMAIN}/topic/${topic}` });
}
