import { ProgrammingTopic, ProgrammingTopicList } from '@/models/enums';
import { parseUrlString } from '@/utils/string-utils/url.util';
import { useParams } from 'next/navigation';

export function useTopicParam() {
  const topicUrlString = useParams().topic;
  const topic = parseUrlString(topicUrlString);

  if (ProgrammingTopicList.includes(topic as any)) {
    return topic as ProgrammingTopic;
  }

  return undefined;
}
