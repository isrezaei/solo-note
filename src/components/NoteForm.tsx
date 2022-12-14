import {Box, Button, Container, HStack, Input, Text, Textarea, VStack} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import {v4 as uuidV4} from "uuid";
import {useRef, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {useNavigate, useNavigation} from "react-router-dom";

export type TagsType = {
    id : string,
    label : string
}

type defaultFormValue = {
    title : string,
    tags : { id : string , label : string }[],
    textArea : string
}

export type NoteData = {
    title: string
    markdown: string
    tags: { id : string , label : string }[]
}


type NoteForm = {
    onSubmit : (data: any )=> void
    onAddTags : (data : { id : string , label : string }) => void
} & Partial<defaultFormValue>



const NoteForm = ({onSubmit , onAddTags , title = '' , tags = [] , textArea = ''} : NoteForm) : JSX.Element => {

    const [localTags , set] = useLocalStorage<TagsType[]>('Tags' , [])

    const [selectedTags , setTags] = useState<TagsType[]>(tags)

    const nav = useNavigate()


    const titleRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)


    const handelSubmit = () =>
    {
        onSubmit({
            title : titleRef.current!.value,
            textArea : textAreaRef.current!.value,
            tags : selectedTags
        })
    }

    const handelAddTags = (label : string) =>
    {
        const newTag = {id : uuidV4() , label}

        //? add tage in selectedTags FOR "tagID" in note array !
        setTags(prev =>[ ...prev , newTag])

        //? add tage in onCreateTags
        onAddTags(newTag)
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
                                             onChange={tags => setTags(tags.map(tag => ({label : tag.label , id : tag.value})))}/>
                        </Box>
                    </VStack>
                </HStack>

                <Textarea ref={textAreaRef} placeholder='Here is a sample placeholder' defaultValue={textArea} />

                <HStack>
                    <Button disabled={false} onClick={handelSubmit}>Submit</Button>
                    <Button  colorScheme={"twitter"}  onClick={() => nav('/')}>Back</Button>
                </HStack>
            </VStack>




        </Container>
    );
};

export default NoteForm;