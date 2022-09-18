import { AppProperty } from '../constants/app';
import { IIssueReport } from '../models/interfaces';
import { deleteRequest, getRequest, postRequest, putRequest } from './requests';

const API_DOMAIN = `${AppProperty.SERVER_DOMAIN}/api/report`;

export function postReportVote(reportId: string, vote: { type: 'up' | 'down' }) {
    return postRequest<IIssueReport>({ url: `${API_DOMAIN}/${reportId}/vote`, body: vote });
}

export function deleteReportVote(reportId: string) {
    return deleteRequest<IIssueReport>({ url: `${API_DOMAIN}/${reportId}/vote` });
}
