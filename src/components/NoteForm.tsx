import {Box, Button, Container, HStack, Input, Text, Textarea, VStack} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
import {v4 as uuidV4} from "uuid";
import {useRef, useState} from "react";


type Tag = {
    id: string
    label: string
}


type newTasks = {
    id : string,
    title : string,
    tags : any[]
    summery : string
}

type NoteForm = {
    onSubmit : ( {} : {title : string , textArea : string , tags : Tag[]})=> void
    onAddTags : (data : string) => void
}



const NoteForm = ({onSubmit , onAddTags} : NoteForm) : JSX.Element => {

    const [selectedTags , setTags] = useState<Tag[]>([])

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
                        <Input placeholder={'add title ...'} ref={titleRef}/>
                    </VStack>


                    <VStack width={'xl'}>
                        <Text>Tags</Text>
                        <Box w={"full"}>
                            <CreatableSelect isMulti
                                             onCreateOption={label => handelAddTags(label)}
                                             value={selectedTags?.map(tag => {
                                                 return {label: tag.label, value: tag.id}
                                             })}
                            />
                        </Box>
                    </VStack>
                </HStack>

                <Textarea ref={textAreaRef} placeholder='Here is a sample placeholder' />

                <Button onClick={handelSubmit}>Submit</Button>
            </VStack>




        </Container>
    );
};

export default NoteForm;