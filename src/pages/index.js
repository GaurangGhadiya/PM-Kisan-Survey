"use client"
import Head from 'next/head'
import SignIn from '../pages/login';

// import { useSession } from "next-auth/react"
import Dashboard from './dashboard';

import { getToken } from '../utils/cookie';
import Landing from './landing';

export default function Home() {

  // const { data: session, status } = useSession()

  const token = getToken();

  const { ulb, token: userToken, userName } = token || {};
  return (
    <div>
      {/* <div className="flex w-screen h-screen" > */}
        {/* <div className="w-screen "> */}
          <Landing />
        {/* </div> */}
      {/* </div> */}

    </div>
  )
}
