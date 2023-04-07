import { IIssueReport } from '../models/interfaces';
import { deleteRequest, postRequest } from './common-requests';

const API_DOMAIN = `/report`;

export function postReportVote(reportId: string, vote: { type: 'up' | 'down' }) {
    return postRequest<IIssueReport>({
        url: `${API_DOMAIN}/${reportId}/vote`,
        body: vote,
    });
}

export function deleteReportVote(reportId: string) {
    return deleteRequest<IIssueReport>({ url: `${API_DOMAIN}/${reportId}/vote` });
}
