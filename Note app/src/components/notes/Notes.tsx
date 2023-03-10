import React, { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteOutline } from "react-icons/md";
import {
  DoneNoteCard,
  FlexContainer,
  NoteButton,
  NoteCard,
  NotesContainer,
} from "../../styles";
import styles from "./index.module.scss";
export const Notes = ({ searchText }: any) => {
  const [remaining, setRemaining] = useState(200);
  type NotesObjectProps = {
    id: string;
    noteText: string | undefined;
    noteDate: string;
  };
  const [notesObject, setNotesObject] = useState<NotesObjectProps[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleRemaining = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setRemaining(200 - newValue.length);
  };
  const handleSaveNote = () => {
    const textArea = textAreaRef.current;
    const date = new Date();
    setNotesObject((notes) => [
      ...notes,
      {
        id: uuidv4(),
        noteText: textArea?.value,
        noteDate: date.toLocaleDateString(),
      },
    ]);
  };
  const handleDeleteNote = (id: NotesObjectProps["id"]) => {
    setNotesObject(notesObject.filter((note) => note.id !== id));
  };

  useEffect(() => {
    const localNotes = localStorage.getItem("notes");
    setNotesObject(localNotes ? JSON.parse(localNotes) : []);
  }, []);

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const textArea = textAreaRef.current;
      if (textArea != undefined) {
        textArea.value = "";
      }
      localStorage.setItem("notes", JSON.stringify(notesObject));
      setRemaining(200);
    } else {
      isMounted.current = true;
    }
  }, [notesObject]);

  const filterSearch = notesObject.filter((note) => {
    return note?.noteText?.toLowerCase()?.includes(searchText.toLowerCase());
  });

  return (
    <NotesContainer>
      <>
        {filterSearch.map((note) => {
          return (
            <DoneNoteCard key={note.id}>
              <textarea
                className={styles.noteText}
                readOnly
                defaultValue={note.noteText}
              ></textarea>
              <FlexContainer justifyContent="space-between" alignItems="center">
                <span>{note.noteDate}</span>
                <MdDeleteOutline
                  size={22}
                  className={styles.deleteIcon}
                  onClick={() => handleDeleteNote(note.id)}
                />
              </FlexContainer>
            </DoneNoteCard>
          );
        })}
        <NoteCard>
          <textarea
            ref={textAreaRef}
            maxLength={200}
            onChange={handleRemaining}
            className={styles.noteText}
            placeholder="Type to add a note..."
          ></textarea>
          <FlexContainer justifyContent="space-between" alignItems="center">
            <span className={styles.cardRemaining}>{remaining} Remaining</span>
            <NoteButton onClick={handleSaveNote}>Save</NoteButton>
          </FlexContainer>
        </NoteCard>
      </>
    </NotesContainer>
  );
};
