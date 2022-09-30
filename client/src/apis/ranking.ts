import { AppProperty } from '../constants/app';
import { getRequest } from './requests';
import { IRanking } from '../models/interfaces';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/ranking`;

export async function getRanking() {
    return await getRequest<IRanking[]>({ url: API_DOMAIN });
}
