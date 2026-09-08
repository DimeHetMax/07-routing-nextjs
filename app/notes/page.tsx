import NoteClient from './Notes.client';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

const Notes = async () => {
  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: ['notes', 1, ""],
    queryFn: () => fetchNotes(1, ''),
  });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteClient />
      </HydrationBoundary>
  );
};

export default Notes;
