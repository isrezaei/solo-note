import {Box, Button, Container, HStack, Input, Text, Textarea, VStack} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import {v4 as uuidV4} from "uuid";
import {useRef, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";



export type TagsType = {
    id : string,
    label : string
}

type defaultFormValue = {
    title : string,
    tags : { id : string , label : string }[],
    textArea : string

}

type NoteForm = {
    onSubmit : ( {} : {title : string , textArea : string , tags : TagsType[]})=> void
    onAddTags : (data : string) => void
} & Partial<defaultFormValue>



const NoteForm = ({onSubmit , onAddTags , title = '' , tags = [] , textArea = ''} : NoteForm) : JSX.Element => {

    const [localTags] = useLocalStorage<TagsType[]>('Tags' , [])

    const [selectedTags , setTags] = useState<TagsType[]>(tags)


    const titleRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)


    const handelSubmit = () =>
        onSubmit({
            title : titleRef.current!.value,
            textArea : textAreaRef.current!.value,
            tags : selectedTags
        })

    const handelAddTags = (label : string) =>
    {
        //? add tage in selectedTags
        setTags(prev =>[ ...prev , {id : uuidV4() , label}])

        //? add tage in onCreateTags
        onAddTags(label)
    }






    return (

        <Container maxW={'2xl'} h={'100vh'} py={8}>

            <VStack w={'full'} >

                <Text>Build Own Tasks </Text>

                <HStack  w={"full"} justify={'space-around'}>

                    <VStack width={'xl'}>
                        <Text>Title</Text>
                        <Input placeholder={'add title ...'} ref={titleRef} defaultValue={title}/>
                    </VStack>


                    <VStack width={'xl'}>
                        <Text>Tags</Text>
                        <Box w={"full"}>
                            <CreatableSelect isMulti
                                             onCreateOption={label => handelAddTags(label)}
                                             value={selectedTags?.map(tag => {
                                                 return {label: tag.label, value: tag.id}
                                             })}
                                             options={localTags.map((tag )  => ({label : tag.label , id : tag.id}))}
                                             onChange={tags => setTags(tags.map(tag => ({label : tag.label , id : tag.value})))}/>
                        </Box>
                    </VStack>
                </HStack>

                <Textarea ref={textAreaRef} placeholder='Here is a sample placeholder' defaultValue={textArea} />

                <Button onClick={handelSubmit}>Submit</Button>
            </VStack>




        </Container>
    );
};

export default NoteForm;