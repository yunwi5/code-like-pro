import { ProgrammingTopicList } from '../models/enums';

export function getTagsCount(exercises: Array<{ tags: string[] }>) {
    const countMap: { [key: string]: number } = {};
    exercises.forEach((ex) => {
        ex.tags.forEach((tag) => {
            if (tag in countMap) countMap[tag]++;
            else countMap[tag] = 1;
        });
    });

    return countMap;
}
