import { AppProperty } from '../constants/app';
import { getRequest, postRequest, putRequest, patchRequest, deleteRequest } from './requests';
import { IBadge } from '../models/interfaces';
import React, { useEffect, useState } from 'react';

export async function getBadges(id:string) {
    const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/user/${id}/badges`;
    return await getRequest<IBadge[]>({ url: API_DOMAIN });
}