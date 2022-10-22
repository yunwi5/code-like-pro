import { AppProperty } from '../constants/app';
import { getRequest, postRequest } from './requests.api';
import { IBadge } from '../models/interfaces';
import { RarityBreakpoint } from '../utils/badge';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/badge`;

export async function getBadges(id: string) {
    const url = `${AppProperty.SERVER_DOMAIN}/api/user/${id}/badge`;
    return await getRequest<IBadge[]>({ url });
}

export function postCreationBadge(amount: RarityBreakpoint) {
    return postRequest<IBadge>({ url: `${API_DOMAIN}/creation/${amount}`, body: {} });
}

export function postSolvingBadge(amount: RarityBreakpoint) {
    return postRequest<IBadge>({ url: `${API_DOMAIN}/solving/${amount}`, body: {} });
}

export function postShowcaseBadge(amount: RarityBreakpoint) {
    return postRequest<IBadge>({ url: `${API_DOMAIN}/showcase/${amount}`, body: {} });
}
