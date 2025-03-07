import { useState } from 'react';
//import { marked } from 'marked';
import Markdown from 'marked-react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


function App() {

  const init = `
  # React Markdown Previewer

## sub-heading1...
### sub-headin2

\`console.log("Hello freecodecamp")\`,

\`\`\`
// this is multi-line code:

function add(num1, num2) {
  return num1 + num2;
}
\`\`\`

Google: [Google](https://google.com)
> Block Quotes

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. one
2. two
3. 3

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

  

  const [display, SetDisplay] = useState(init);

  const handleChange = (e) => {
    let input = e.target.value;
    SetDisplay(input);

  }

  
  

  return (
    <div style={{height: "100vh", overflowY: 'scroll'}}>
      <div>
        User Story #1: I can see a textarea element with a corresponding id="editor".

        User Story #2: I can see an element with a corresponding id="preview".

        User Story #3: When I enter text into the #editor element, the #preview element is updated as I type to display the content of the textarea.

        User Story #4: When I enter GitHub flavored markdown into the #editor element, the text is rendered as HTML in the #preview element as I type (HINT: You don't need to parse Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked).

        User Story #5: When my markdown previewer first loads, the default text in the #editor field should contain valid markdown that represents at least one of each of the following elements: 
        a heading element (H1 size), a sub heading element (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text.

        User Story #6: When my markdown previewer first loads, the default markdown in the #editor field should be rendered as HTML in the #preview element.
      </div>

      <textarea id="editor" onChange={handleChange} defaultValue={display}/>

      <div id="preview">
        <Markdown gfm={true} breaks={true}>{display}</Markdown>
      </div>
      
      

    </div>
  )
}

export default App
