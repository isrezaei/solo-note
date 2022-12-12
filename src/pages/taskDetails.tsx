import {useParams, useNavigate, Outlet, useOutletContext} from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {NotesType} from "../types/types";
import {useEffect, useMemo} from "react";
import _ from "lodash";
import {Badge, Button, Container, HStack, Text, Textarea, VStack} from "@chakra-ui/react";

const TaskDetails = () => {




    const {id : paramsID} = useParams()
    const navigate = useNavigate()


    const [notes , setNotes] = useLocalStorage<NotesType[]>('NOTES' , [])


    console.log(notes)

    const RENDER_SPECIFIC_TASK = useMemo(() => {

        return _.filter(notes , {id : paramsID})

    } , [paramsID , notes])


    const DELETE_SPECIFIC_TASK = () =>
    {
        setNotes(prevState => _.reject(prevState , {id : paramsID}))
    }

    //? When we delete this file, nothing remains in the "RENDER_SPECIFIC_TASK" array
    useEffect(() => {
        if (RENDER_SPECIFIC_TASK.length === 0) return navigate('/')
    } , [RENDER_SPECIFIC_TASK])



    return (
        <Container maxW={'2xl'} h={'100vh'} py={8} position={"relative"}>
            {
                RENDER_SPECIFIC_TASK.map(TASk => {


                    return (
                        <VStack  w={"full"} >


                                <VStack align={'start'} w={"full"} my={5}>
                                    <Text fontSize={25} fontWeight={'bold'}>{TASk.title.toUpperCase()}</Text>
                                    <Text>{TASk.tags.map(tag => <Badge colorScheme='twitter' mr={2}>{tag.label}</Badge>)}</Text>
                                </VStack>


                            <Textarea variant={'filled'}  isReadOnly={true} placeholder={TASk.textArea} />

                        </VStack>
                    )
                })
            }


            <HStack position={'absolute'} top={0} right={0} m={2}>
                <Button onClick={() => navigate(`/detailsTasks/${paramsID}/EditTask`)} size={"xs"} colorScheme={'twitter'}>Edit</Button>
                <Button onClick={DELETE_SPECIFIC_TASK} size={"xs"} colorScheme={"red"} variant={'outline'}>Delete</Button>
                <Button size={"xs"} colorScheme={'blackAlpha'} variant={'outline'}>Back</Button>
            </HStack>


        </Container>
    );
};

export default TaskDetails;

