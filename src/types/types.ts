export type TAGS_TYPES = {
    id : string
    label : string
}


export type NotesType = {
    id : string
    tags : {id : string , label : string}[]
    tagsID : string[]
    textArea : string
    title : string
}

export type TagsType = {
    id : string,
    label : string
}