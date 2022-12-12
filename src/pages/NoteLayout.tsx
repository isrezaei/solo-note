import {Outlet, useOutletContext, useParams} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {NotesType} from "../types/types";
import _ from "lodash";


const NoteLayout = () => {

    const {id : paramsID} = useParams()

    const [notes , setNotes] = useLocalStorage<NotesType[]>('NOTES' , [])

    //? find specific note and get value
    const defaultFormValue = _.find(notes , {id : paramsID})

    return <Outlet context={{paramsID , defaultFormValue}}/>
};

export default NoteLayout;

export function useEdit() {
    return useOutletContext();
}