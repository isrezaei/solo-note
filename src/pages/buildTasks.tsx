import NoteForm from "../components/NoteForm";
import useLocalStorage from "../hooks/useLocalStorage";
import {v4 as uuidV4} from "uuid";
import {TagsType} from "../types/types";

type NotesType = {
    id : string,
    tagsID : null[] | string[],
    tags? : {id : string , label : string}
    data : {
        textArea : string,
        title : string,
    }
}


const BuildTasks = () => {

    const [notes, setNotes] = useLocalStorage<NotesType[]>('NOTES', [])
    const [tags, setTags] = useLocalStorage<TagsType[]>('Tags', [])

    //? set one Note in "note" state with previous state , new uuId4 and tags array
    const onCreateNote = ({tags, ...data}: {tags : {id : string , label : string}[]  , data : {textArea : string , title : string}}) =>
        //! get tags id for note array
        setNotes((prevState : NotesType[]) => [...prevState , { ...data ,  id : uuidV4()  , tagsID : tags.map(tag => tag.id)}])

    //! set on Tags data in tags state with uuId4 and tag label
    const onCreateTags = (tagsInfo : {id : string , label : string}) =>
        setTags(prevState => [...prevState , tagsInfo])

    console.log(notes)

    return (
        <NoteForm
            onSubmit = {onCreateNote}
            onAddTags={onCreateTags}
        />
    )
};

export default BuildTasks;