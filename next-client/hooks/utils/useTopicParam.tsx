import { useParams } from 'next/navigation';
import { ProgrammingTopic, ProgrammingTopicList } from '@/models/enums';
import { deslugify } from '@/utils/string-utils/url.util';

export function useTopicParam(): ProgrammingTopic | null {
  const topic = deslugify(useParams().topic ?? '');
  return ProgrammingTopicList.includes(topic as any) ? (topic as ProgrammingTopic) : null;
}
