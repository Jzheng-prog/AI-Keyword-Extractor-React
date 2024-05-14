import {useState} from 'react'
import { Container, Box} from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TextInput from './components/TextInput'

const App = () => {

  const [keywords, setKeyWords] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const extractKeywords = async (text)=>{

    setLoading(true);
    setIsOpen(true);


    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: "Extract Keywords from this text. Make the first letter of eac word uppercase and separate with commas \n\n" + text + '',
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8
      })
    }
    let response;
    try{
      response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);
      console.log(response)

    }catch(error){
      console.log(error)
    }

    
    const responseData = await response.json();

    const data = responseData[0].text.trim();

    console.log(data)
    setKeyWords(data)
    setLoading(false)
  }
  return (

    <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
      <Container maxW='3xl' centerContent>
        <Header/>
        <TextInput extractKeywords={extractKeywords}/>
        <Footer/>
      </Container>
    </Box>
  )
}

export default App
