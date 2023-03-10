import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from "../../firebase-config"
function AddUserModel(props) {
    const [user] = useAuthState(auth);
    const [inputData, setinputData] = useState();
    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const [modelVisible, setmodelVisible] = useState(false);
    const chats = snapshot?.docs?.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    const router = useRouter();
    const redirect = (id) => {
        router.push(`/chat/${id}`);
    }
    const chatExists = email => chats?.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))
    const addUser = () => {
        if (!chatExists(inputData.email) && (inputData != user.email)) {
            addDoc(collection(db, "chats"), {
                users: [user.email, inputData.email]
            })
        }
    }
    const onchange = (e) => {
        setinputData({ ...inputData, [e.target.name]: e.target.value })
    }
    return <>
        <div id="popup-modal" tabindex="-1" class={`fixed top-0 left-0 right-0 z-50 ${props.ModelVisible || modelVisible ? 'block' : 'hidden'} p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}>
            <div class="relative w-full h-full max-w-md md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={props.closeModel} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <input value={inputData?.email} onChange={onchange} type="email" placeholder="Enter email" name="email" className='w-full mb-3 border outline-none border-gray-400' />
                        <button onClick={addUser} data-modal-hide="popup-modal" type="button" class=" px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </button>
                        <button data-modal-hide="popup-modal" type="button" class="px-5 py-2.5 text-center mr-2">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddUserModel