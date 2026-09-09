'use client';
import { useQuery } from '@tanstack/react-query';
import css from './NotePreviewClient.module.css';
import { getNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';
import ModalPreview from '@/components/ModalPreview/ModalPreview';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error...</p>}
      {!isLoading && !isError && (
        <ModalPreview >
          <main className={css.main}>
            <div className={css.container}>
              <div className={css.item}>
                <div className={css.header}>
                  <h2>{data?.title}</h2>
                </div>
                <p className={css.tag}>{data?.tag}</p>
                <p className={css.content}>{data?.content}</p>
                <p className={css.date}>{data?.updatedAt ? data?.updatedAt : data?.createdAt}</p>
              </div>
            </div>
          </main>
        </ModalPreview>
      )}
    </>
  );
};
export default NotePreviewClient;
