import NoteForm from "../components/NoteForm";
import useLocalStorage from "../hooks/useLocalStorage";
import {v4 as uuidV4} from "uuid";
import {NotesType, TagsType} from "../types/types";


type NoteValue = {
    tags : {id : string , label : string}[]
    textArea : string,
    title : string
}

const BuildTasks = () => {

    const [notes , setNotes] = useLocalStorage<NotesType[]>('NOTES' , [])
    const [tags , setTags] = useLocalStorage<TagsType[]>('Tags' , [])


    //? set one Note in "note" state with previous state , new uuId4 and tags array
    const onCreateNote = (NoteValue : NoteValue) =>
        setNotes(prevState => [...prevState , { ...NoteValue ,  id : uuidV4()  , tagsID : NoteValue.tags.map(tag => tag.id)}])


    //? set on Tags data in tags state with uuId4 and tag label
    const onCreateTags = (label : string) =>
        setTags(prevState => [...prevState , {id : uuidV4() , label : label}])


    return (
        <NoteForm
            onSubmit={onCreateNote}
            onAddTags={onCreateTags}
        />
    )
};

export default BuildTasks;