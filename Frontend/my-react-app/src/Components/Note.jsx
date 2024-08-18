import { 
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader, 
    Divider, 
    Heading , 
    IconButton, 
    Text,
    Flex
} from '@chakra-ui/react'
import { DeleteIcon , EditIcon} from '@chakra-ui/icons';
import moment from 'moment/moment'

export default function Note({title,description,createdAt,onDelete,onEdit}){


    return(
            <Card variant={"filled"}>
              <CardHeader >
                <Flex justify="space-between" align="center">
                <Heading size={"md"}>{title}</Heading>
                <Flex gap={2}>
                <IconButton
                aria-label='Delete Note'
                icon={<DeleteIcon />}
                onClick={onDelete}
                />
                <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                onClick={onEdit}
                />
                </Flex>
                </Flex>
              </CardHeader>
              <Divider borderColor={"gray"}/>
              <CardBody>
                <Text>{description}</Text>
              </CardBody>
              <Divider borderColor={"gray"}></Divider>
              <CardFooter>{moment(createdAt).format("DD/MM/YYYY h:mm:ss" )}</CardFooter>
            </Card>
    )
}