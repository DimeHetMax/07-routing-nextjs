'use client';
import { useState } from "react";
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

//styles
import css from "./NotesPage.module.css"

// components
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

//services
import { fetchNotes } from "@/lib/api";

const NoteClient = () => {
const[page, setPage]=useState<number>(1);
const[search, setSearch] = useState<string>("");
const[isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [searchInputDebounced] = useDebounce(search, 500);

const {data, isPending, isError, isSuccess} = useQuery({
    queryKey:["notes", page, searchInputDebounced],
    queryFn: ()=> fetchNotes(page, searchInputDebounced),
    placeholderData: keepPreviousData,
})
  const handleSearchOnChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
    const handleModalClose = () => {
    setIsModalOpen(false);
  };
const showNoteList = !isPending && !isError && data.notes.length >0
  return (
   <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchOnChange} />
        {showNoteList && isSuccess && data.totalPages >= 1 && (
          <Pagination
            totalPages={data.totalPages}
            setPage={setPage}
            currentPage={page}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {showNoteList && isSuccess && <NoteList notes={data.notes} />}
       {isModalOpen && (
        <Modal onBackDropClose={handleModalClose}>
          <NoteForm handleModalClose={handleModalClose} />
        </Modal>
      )}
    </main>
  );
};
export default NoteClient;
