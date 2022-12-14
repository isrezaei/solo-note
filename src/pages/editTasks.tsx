import NoteForm from "../components/NoteForm";
import {Text} from "@chakra-ui/react";
import useLocalStorage from "../hooks/useLocalStorage";
import {NotesType, TagsType} from "../types/types";
import {useEdit} from "./NoteLayout";
import {v4 as uuidV4} from "uuid";

type NoteValue = {
    textArea : string,
    title : string
    tags : {id : string , label : string}[]
}


const EditTasks = () => {

    const [notes , setNotes] = useLocalStorage<NotesType[]>('NOTES' , [])
    const [tags , setTags] = useLocalStorage<TagsType[]>('Tags' , [])


    const {paramsID , defaultFormValue} : any = useEdit()


    //? just editing title , tags , textArea and tags Id
    const onEditeTask = (NoteValue : NoteValue) =>
    {
        setNotes(prevState  => {

            return prevState.map(NOTES => {

                if (NOTES.id === paramsID)
                {
                    return {
                        ...NOTES , ...NoteValue , tagsID : NoteValue.tags.map(tag => tag.id)
                    }
                }
                return NOTES
            })
        })
    }

    const onCreateTags = (tagsInfo : {id : string , label : string}) =>
        setTags(prevState => [...prevState , tagsInfo])



    return (
        <NoteForm
            title = {defaultFormValue.title}
            tags = {defaultFormValue.tags}
            textArea = {defaultFormValue.textArea}
            onSubmit={onEditeTask}
            onAddTags={onCreateTags} />
    );
};

export default EditTasks;