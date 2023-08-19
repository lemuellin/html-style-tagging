import React, { useState } from 'react';
import '../styles/styles.css';

const FileStyleTagInput = () => {
    const [styleTag, setStyleTag] = useState('');

    function downloadBlob(blob, name = 'article.txt') {
        // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
        const blobUrl = URL.createObjectURL(blob);
      
        // Create a link element
        const link = document.createElement("a");
      
        // Set link's href to point to the Blob URL
        link.href = blobUrl;
        link.download = name;
      
        // Append link to the body
        document.body.appendChild(link);
      
        // Dispatch click event on the link
        // This is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
          new MouseEvent('click', { 
            bubbles: true, 
            cancelable: true, 
            view: window 
          })
        );
      
        // Remove link from body
        document.body.removeChild(link);
    }
      

    const handleFileInput = async (e) => {
        if (e.target.files.length === 0) {
            alert('Please select files first!');
            return;
        }

        for(let i = 0; i < e.target.files.length; i++){
            let fr = new FileReader();
            const file = e.target.files[i];
            
            fr.onload = (event) => {
                const content = event.target.result;
                const newContent = '<style>' + '\n' + styleTag + '\n' + '<style/>' + '\n' + '\n' + content;

                // Create a Blob from the new content
                const blob = new Blob([newContent], { type: 'text/plain' });
                downloadBlob(blob, 'article.txt');
            }
            
            fr.readAsText(file);

        }
    }

    const handleInput = (input) => {
        setStyleTag(input.target.value);
    }

    return(
        <div className='inputForm'>
            
            <label htmlFor="cssStyle">CSS Style:</label>
            <textarea id="cssStyle" name="cssStyle" rows="15" cols="40" onChange={handleInput} defaultValue={'body{'+ '\n' + 'font-family: Roboto;' + '\n' + 'font-color: black;' + '\n' + '}' + '\n'}>
            </textarea>

            <input id='selectFile' style={{display:'none'}} type="file" onChange={(e)=>{ handleFileInput(e) }} multiple/>
            <input type="button" id="selectFileBtn" value="Select Files and Process" onClick={() => {document.getElementById('selectFile').click()}} />
        </div>
    );
}

export default FileStyleTagInput;