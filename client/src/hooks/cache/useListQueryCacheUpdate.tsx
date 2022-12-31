import { useQueryClient } from '@tanstack/react-query';

type ObjectWithId = { _id: string };

// Updating react query cache for a query returning a list of items.
function useListQueryCacheUpdate<T extends ObjectWithId>(queryKey: string) {
    const queryClient = useQueryClient();

    const addItemToCache = (newItem: T) => {
        queryClient.setQueriesData([queryKey], (oldData: { data: T[] } | undefined) => {
            if (!oldData) return oldData;

            const newItems = [...oldData.data, newItem];
            return { ...oldData, data: newItems };
        });
    };

    const updateItemInCache = (updatedItem: T) => {
        queryClient.setQueryData([queryKey], (oldData: { data: T[] } | undefined) => {
            if (!oldData) return oldData;

            const newItems = [...oldData.data];
            const index = newItems.findIndex((c) => c._id === updatedItem._id);
            if (index < 0) return oldData;

            newItems[index] = updatedItem;
            const newData = { ...oldData, data: newItems };
            return newData;
        });
    };

    const deleteItemInCache = (itemId: string) => {
        queryClient.setQueryData([queryKey], (oldData: { data: T[] } | undefined) => {
            if (!oldData) return oldData;

            const newItems = oldData.data.filter((item) => item._id !== itemId);
            const newData = { ...oldData, data: newItems };
            return newData;
        });
    };

    return {
        addItemToCache,
        updateItemInCache,
        deleteItemInCache,
    };
}

export default useListQueryCacheUpdate;
