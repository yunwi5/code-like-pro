import { AppProperty } from '../constants/app';
import { getRequest, postRequest, putRequest, patchRequest, deleteRequest } from './requests';
import { IBadge } from '../models/interfaces';
import React, { useEffect, useState } from 'react';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/user/:id/badges`;

export async function getBadges(user:String, id:number) {
    return await getRequest<IBadge[]>({ url: API_DOMAIN });
}