import React, { useEffect }  from 'react';
import bwip from 'bwip-js';

import './App.css';

const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function App() {
  const qrCode = 'UEsDBBQACAgIAFJ8n1cAAAAAAAAAAAAAAAAPAAAAcXJHZW5lcmF0b3IueG1sZVHJjptAEL3nK0p1jZduoBuQzCjtBuKWmiUYrMkpYqJJxpItR8P4kL/Pg5lbONTStbxXj11LLs84EEG4lsE6lExHm7HZ27woEdcZSyGEjFKm9ohCoNIoZLJoCnScxKHWyNCWivm5z9hWX5maAYE5rl3JD58I367NCfMCa9BzMHWOqMWDiEQcyDCMdYwFbZHx9XkaX2/Tj6c/X/6OL7fb5uftiooB+tAVnk7eODuQkvR0n0jSSAGsXpHQMlXRik7jdLmfmfrvGRcghQMjnCATmWgVKqXiOFJpwFSCty/qoTdMHvFhOAy+QFL+BxauyL6c386X8f3KrqmYDFR4e70/M1VdxkrKhKlrlitdv7jjI3Ri2oOCTLWeNRbQuJwv5+2HNDk5u3TnGIIIflYRvq8wBbc0LyIj2yP7NV4mgJr5h1TNo7POe1cPFX0GJZcjsN6cBm9qcAdPbE9idf29lQEstCwB0FRtt6HS+WoD5GX3N9hoA6zeLrQ/juhRDRe6u2378A9QSwcIdNgRKYIBAAAzAgAAUEsBAhQAFAAICAgAUnyfV3TYESmCAQAAMwIAAA8AAAAAAAAAAAAAAAAAAAAAAHFyR2VuZXJhdG9yLnhtbFBLBQYAAAAAAQABAD0AAAC/AQAAAAA=';
  const url = URL.createObjectURL(b64toBlob(qrCode, 'application/octet-stream'));

  useEffect(() => {
      try {
        bwip.toCanvas('qr', {
          bcid: `datamatrix`,
          text: atob(qrCode),
        });
      } catch (e) {
        console.error(e);
      }
  }, []);

  return (
    <div className="App"> 
      <main>
        <canvas id='qr' className='qr-canvas'/>
        <div className="spacer"></div>
        <a href={url} download="download.zip">Download</a>
      </main>
    </div>
  );
}

export default App;

