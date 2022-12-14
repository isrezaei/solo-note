import useLocalStorage from "./hooks/useLocalStorage";
import {NotesType, TagsType} from "./types/types";
import {
    Badge,
    Box,
    Button,
    Container,
    Grid,
    HStack,
    Input,
    Stack,
    Text,
    Textarea,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import {useMemo, useState} from "react";
import _ from 'lodash';
import Select from 'react-select'
import {useNavigate} from "react-router-dom";




function Root() {

    const navigate = useNavigate()
    const [notes , setNotes] = useLocalStorage<NotesType[]>('NOTES' , [])
    const [tags , setTags] = useLocalStorage<TagsType[]>('Tags' , [])
    const [inputValue , setInputValue] = useState<string>('')
    const [selectedTag , setSelectedTag] = useState<readonly TagsType[]>([])
    const [openModal , setOpenModal] = useState<boolean>(false)



    const ADD_TAGS_IN_NOTE_OBJECT = useMemo(() => {
        return notes.map(value => {
            return {
                ...value ,
                tags : tags.filter(tag => value.tagsID?.includes(tag.id))
            }
        })
    } , [notes , tags])



    const FILTER_BY_TAGS_ADN_TITLE = useMemo(() => {

        if (_.some(ADD_TAGS_IN_NOTE_OBJECT , {title : inputValue}))
        {
            return _.filter(ADD_TAGS_IN_NOTE_OBJECT , {'title' : inputValue })
        }
        if (selectedTag?.length !== 0)
        {
            return ADD_TAGS_IN_NOTE_OBJECT.filter(value => value.tags.some(value => value.label === _.map(selectedTag , 'label')[0]))
        }

        return ADD_TAGS_IN_NOTE_OBJECT

    } , [inputValue , selectedTag , ADD_TAGS_IN_NOTE_OBJECT , tags])




    const RENDER_TASKS = FILTER_BY_TAGS_ADN_TITLE.map(TASK => {
        return (
            <VStack onClick={() => navigate(`/detailsTasks/${TASK.id}`)} justify={'center'} key={TASK.id} w={"full"} h={'6vw'}  bg={'blackAlpha.200'} rounded={"xl"} >
                <Text fontSize={20} fontWeight={"bold"} color={"blue.600"}>{TASK.title}</Text>
                <HStack>{TASK.tags.map(tag => <Badge colorScheme='twitter'>{tag.label}</Badge>)}</HStack>
            </VStack>
        )
    })


    const EDITE_TEXT_OF_TAGS = (tagsText : string , tagsID : string ) => setTags(prevState  => {
        return prevState.map(value => {

            if (value.id === tagsID)
            {
                return {
                    ...value,
                    label : tagsText
                }
            }
            return value
        })
    })

    const REMOVE_SPECIFIC_TAG = (tags : string) => setTags(prevState => prevState.filter(value => value.id !== tags))
    const RENDER_TAGS = tags.map(TAG => {
        return (
            <HStack justify={'space-between'} w={"full"} h={10} p={3} my={4}  key={TAG.id}>

                <Input  onChange={(e) => EDITE_TEXT_OF_TAGS(e.target.value , TAG.id)} defaultValue={TAG.label}/>

                <Button onClick={() => REMOVE_SPECIFIC_TAG(TAG.id)} size={'xs'} colorScheme={'red'}>Remove</Button>
            </HStack>
        )
    })



    return (
        <Container maxW={'2xl'} h={'100vh'} py={8} position={"relative"}>

            <VStack w={'full'} >

                <Text>Welcome To Task App</Text>

                <HStack  w={"full"} justify={'space-around'}>

                    <VStack width={'xl'}>
                        <Text>Title</Text>
                        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    </VStack>


                    <VStack width={'xl'}>
                        <Text>Tags</Text>
                        <Box w={"full"}>
                            <Select isMulti
                                    options={tags.map((tag) => ({id : tag.id , label : tag.label}))}
                                    onChange={(data) => setSelectedTag(data)}
                            />
                        </Box>
                    </VStack>
                </HStack>


            </VStack>

            <Grid templateColumns='repeat(2, 1fr)' gap={5} my={5}>
                {
                    RENDER_TASKS
                }
            </Grid>


            <HStack position={'absolute'} top={0} right={0} m={2}>
                <Button size={'xs'} bg={"twitter.400"} onClick={() => navigate('/buildTasks')}>Create</Button>
                <Button onClick={() => setOpenModal(prevState => !prevState)} size={'xs'} variant={'outline'} >Edit Tags</Button>
            </HStack>

            <Modal size={'xl'} motionPreset='slideInRight' isCentered isOpen={openModal} onClose={() => setOpenModal(prevState => !prevState)}>
                <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {RENDER_TAGS}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => setOpenModal(prevState => !prevState)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Container>
    )
}

export default Root
