import { AppProperty } from '../constants/app';
import { getRequest, postRequest, putRequest, patchRequest, deleteRequest } from './requests';
import { IRanking } from '../models/interfaces';
import React, { useEffect, useState } from 'react';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/ranking`;

export async function getRanking() {
    return await getRequest<IRanking[]>({ url: API_DOMAIN });
}

export async function fetchRanking() {
    const [error, setError] = useState(null);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        fetch(API_DOMAIN)
            .then(res => res.json())
            .then(
                (result) => {
                    setRanking(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    if (error) {
        console.log('Ranking fetch error: cannot fetch data from the server!');
        return error;
    }
    else {
        let array = [];
        for (let jsobject in ranking) {
            array.push(jsobject);
        }
        return array;
    }
}