import { AppProperty } from '../constants/app';
import { getRequest } from './requests';
import { IRanking } from '../models/interfaces';
import { ProgrammingTopic } from '../models/enums';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/ranking`;

export function getRanking() {
    return getRequest<IRanking[]>({ url: API_DOMAIN });
}

export function getTopicRanking(topic: ProgrammingTopic) {
    return getRequest<IRanking[]>({ url: `${API_DOMAIN}/topic/${topic}` });
}
