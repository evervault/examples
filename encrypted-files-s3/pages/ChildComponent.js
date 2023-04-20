import { useState } from 'react';
import { useEvervault } from '@evervault/react';

export default function ChildComponent() {
  const evervault = useEvervault();

  const [selectedFile, setSelectedFile] = useState("");
  const [encrypted, setEncrypted] = useState("");

  async function uploadFile(e) {
    e.preventDefault();
    const fileName = encrypted.name
    const fileType = encrypted.type
    const res = await fetch(`/api/get-url?fileName=${fileName}&fileType=${fileType}`);
    const { url } = await res.json()

    const upload = await fetch(url, {
        method: 'PUT',
        body: encrypted,
        headers: { "Content-Type": fileType }
    })
    if (upload.ok) {
        console.log('Uploaded successfully!')
    } else {
        console.error('Upload failed.')
    }
  };

  async function encryptFile(input) {
    let encrypted = await evervault.encrypt(input);
    console.log(encrypted);
    setEncrypted(encrypted);
  }

  return (
        <div>
        <input
        type="file" 
        id="myFile"
        name="myFile"
        value={selectedFile}
        onChange={(e) => encryptFile(e.target.files[0])}
      /> 
      <button onClick={(e) => uploadFile(e)}>
          save to s3
        </button>
        </div>
  );
}