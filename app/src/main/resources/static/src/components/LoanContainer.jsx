import { Grid,Card,Container,Image,Col,Spacer,Text } from "@nextui-org/react"


export const LoanContainer = ({loans,color}) =>{
    return(
        <div style={{"height":"fit-content"}}>
        {
            loans.map((loan, index)=>(
            <Container lg>
            <Col>
            <Card key={index} color={color}>
                <Card.Body>
                    <Grid.Container>
                        <Grid xs={3}>
                        <Image src={`https://covers.openlibrary.org/b/olid/${loan.book.olid}-M.jpg`} height="250px"/>
                        </Grid>
                        <Grid xs={8}>
                            <Col>
                            <Text size="$2xl">
                                {loan.book.title}
                            </Text>
                            <Text size="$l">
                                {loan.book.author}
                            </Text>
                            <Text size="$l">
                                Date borrowed: {new Date(loan.startDate).toDateString()}
                            </Text>
                            <Text size="$l">
                                Date due: {new Date(loan.endDate).toDateString()}
                            </Text>
                            </Col>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
            </Card>
            <Spacer y={1}/>
            </Col>
        </Container>
            ))
        }
        </div>
        
    )
}