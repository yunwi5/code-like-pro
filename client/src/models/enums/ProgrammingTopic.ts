export enum ProgrammingTopic {
    ARRAY = 'Array',
    ARITHMETIC = 'Arithmetic',
    STRING = 'String',
    BINARY_TREE = 'Binary Tree',
    BINARY_SEARCH_TREE = 'Binary Search Tree',
    HEAP = 'Heap',
    DYNAMIC_PROGRAMMING = 'Dynamic Programming',
    GRAPH = 'Graph',
    GREEDY_ALGORITHM = 'Greedy Algorithm',
    GEOMETRY = 'Geometry',
    RECURSION = 'Recursion',
    SORTING = 'Sorting',
    SEARCHING = 'Searching',
    STACK = ' Stack',
    QUEUE = 'Queue',
    LINKED_LIST = 'Linked List',
}

export const ProgrammingTopicList = Object.freeze(Object.values(ProgrammingTopic).sort());
