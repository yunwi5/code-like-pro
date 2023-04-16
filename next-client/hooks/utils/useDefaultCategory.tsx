import { useSearchParams } from 'next/navigation';
import { ForumCategory, getForumCategory } from '@/models/enums';

function useDefaultCategory(): ForumCategory | undefined {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get('default-category');
  return getForumCategory(defaultCategory ?? '');
}

export default useDefaultCategory;
