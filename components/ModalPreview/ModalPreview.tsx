'use client';

import { useRouter } from 'next/navigation';
import css from "./ModalPreview.module.css"

type Props = {
  children: React.ReactNode;
};

const ModalPreview = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={close}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default ModalPreview;
