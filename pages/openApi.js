import React, { useEffect, useState } from 'react'
import { useUser } from '../lib/hooks'
import { decryptString, encryptString } from '../components/encryption';
import Link from 'next/link';

export default function OpenApi() {
    const user = useUser()
    // const originalText = 'This is a secret message!';

    // // Encrypt the text
    // const encryptedText = encryptString(originalText);
    // var encryptedText
    const [encryptedUser, setencryptedUser] = useState()
  
    // // Decrypt the text
    // const decryptedText = decryptString(encryptedText);
  
    // // Output the results
    // console.log('Original Text:', originalText);
    // console.log('Encrypted Text:', encryptedText);
    // console.log('Decrypted Text:', decryptedText);
  
    useEffect(()=>{
        if(user){
            
            setencryptedUser(  encryptString(user.email))
            // console.log("user",encryptedText);

        }
    },[user])
  return (
    <div>openApi

        {user && (
            <div>
                { 
            console.log("user",encryptedUser)
        }
                <Link href={`http://localhost:3000/openApi/resumes?user=${encryptedUser}`}>link</Link>
            </div>
        )}

    </div>
  )
}
