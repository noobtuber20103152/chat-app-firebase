import { auth, db } from '../../firebase-config';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { addDoc, collection, doc, orderBy, query, serverTimestamp } from 'firebase/firestore';

function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [user] = useAuthState(auth);
  const dbIntance = collection(db, `chats/${id}/messages`);
  const q = query(dbIntance, orderBy("timestamp"));
  const [_snapshot, loading, error] = useCollection(q);
  const messages = _snapshot?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  // console.log(messages);
  const [msg, setmsg] = useState();
  const sendMessage = (id, user) => {
    if (!msg) return;
    // console.log({ message: msg, sender: user.email, timestamp: serverTimestamp() });
    const dbInstance = collection(db, `chats/${id}/messages`);
    addDoc(dbInstance, {
      message: msg,
      sender: user.email,
      timestamp: serverTimestamp()
    }).then(() => {
      // console.log("Success")
    }).catch((err) => {
      // console.log(err.message);
    })
    setmsg("");
  }
  const onchange = (e) => {
    setmsg(e.target.value);
  }
  const loadingContent = () => {
    if (loading) {
      return [1, 2, 3, 4, 1, 2, 3, 4, 1, 5].map(() => {
        let x = Math.floor(100 * Math.random());
        // x = Math.floor
        if (x % 2) {
          return <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm text-blue-600">loremasdfasdfasdfaasfasd</p>
              </div>
              {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        }
        else {

          return <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm text-gray-300">fasdfasdfasdfasd dfasdfas</p>
              </div>
              {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
            </div>
          </div>
        }
      })
    }
  }
  const bottomOfChat = useRef();
  useEffect(() => {
    bottomOfChat.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }, [messages])
  return <>
    <body className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 text-gray-800 ">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {loadingContent()}
          {messages?.map((msg) => {
            const sender = msg.sender === user.email;
            if (sender) {
              return <>
                <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              </>
            }
            else {
              return <>
                <div className="flex w-full mt-2 space-x-3 max-w-xs">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
                  </div>
                </div>
              </>
            }
          })}
          <div ref={bottomOfChat}></div>
        </div>
        <div className="bg-gray-300 p-4 flex justify-between">
          <input onChange={onchange} value={msg} className=" items-center outline-none h-10 w-[80%] inline rounded px-3 text-sm" type="text" placeholder="Type your message…" />
          <button onClick={() => sendMessage(id, user)} className='w-[16%] inline-block px-2 py-1 mt-1 bg-blue-800 rounded-sm text-white'>Send</button>
        </div>
      </div>
    </body>
  </>
}

export default Index