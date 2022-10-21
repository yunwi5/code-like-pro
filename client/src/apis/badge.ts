import { AppProperty } from '../constants/app';
import { getRequest } from './requests.api';
import { IBadge } from '../models/interfaces';

export async function getBadges(id: string) {
    const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/user/${id}/badge`;
    return await getRequest<IBadge[]>({ url: API_DOMAIN });
}
