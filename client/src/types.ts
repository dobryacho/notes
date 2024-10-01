export interface NotesType {
  name:       string;
  notesArray: NotesArray[];
}

export interface NotesArray {
  text?:    string;
  comment?: string;
  check?:   boolean;
  id:       number;
  name?:    string;
  toto?:    string;
}
