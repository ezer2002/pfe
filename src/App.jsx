import { Container, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const PARAMS = {
  temperature: 0.5,
  max_tokens: 40,
}

function App() {
  const [text, setText] = useState('');
  const [cbResponse, setCbResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getInstruction = (input) => {
    return input;
  }

  const handleSendData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const input = getInstruction(text);
    const endpoint = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const body = { ...PARAMS, prompt: input };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, 
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setCbResponse(data.choices[0].text);
      setIsLoading(false);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setIsLoading(false);
    }
  }

  const handleTextChange = (event) => {
    const inputText = event.target.value;
    const words = inputText.split(/\s+/);

    if (words.length <= 40) {
      setText(inputText);
    } else {
      setText(words.slice(0, 40).join(' '));
    }
  };

  return (
    <Container className='mt-3'>
      <form onSubmit={handleSendData}>
        <div>
          <textarea
            placeholder='Your text must not exceed 40 words.'
            cols={50}
            rows={10}
            value={text}
            onChange={handleTextChange}
          />
        </div>
        <div>
          <Button variant='info' type='submit' className='mt-3'>
            Generate
          </Button>
        </div>
      </form>
      <div className='mt-3'>
        {isLoading ? (
          <Spinner animation='border' variant='info' />
        ) : (
          cbResponse ? cbResponse : 'The text has not been entered.'
        )}
      </div>
    </Container>
  );
}

export default App;
