import useLocalStorage from "./hooks/useLocalStorage";
import {NotesType, TagsType} from "./types/types";
import {Badge, Box, Button, Container, Grid, HStack, Input, Stack, Text, Textarea, VStack} from "@chakra-ui/react";
import CreatableSelect from "react-select/creatable";
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

  const FILTER_BY_TAGS_ADN_TITLE = useMemo(() => {


    if (_.some(notes , {title : inputValue}))
    {
      return _.filter(notes , {'title' : inputValue })
    }
    if (selectedTag?.length !== 0)
    {
      return notes.filter(value => value.tags.some(value => value.label === _.map(selectedTag , 'label')[0]))
    }

    return notes

  } , [inputValue , selectedTag , notes , tags])


  console.log(notes)



  const RENDER_TASKS = FILTER_BY_TAGS_ADN_TITLE.map(TASK => {
    return (
        <VStack onClick={() => navigate(`/detailsTasks/${TASK.id}`)} justify={'center'} key={TASK.id} w={"full"} h={'6vw'}  bg={'blackAlpha.200'} rounded={"xl"} >
          <Text fontSize={20} fontWeight={"bold"} color={"blue.600"}>{TASK.title}</Text>
          <HStack>{TASK.tags.map(tag => <Badge colorScheme='twitter'>{tag.label}</Badge>)}</HStack>
        </VStack>
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
          <Button size={'xs'} variant={'outline'} >Edit Tags</Button>
        </HStack>


      </Container>
  )
}

export default Root
