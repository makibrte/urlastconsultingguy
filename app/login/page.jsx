'use client'

import { login, signup } from './actions';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {createClient} from "@/utils/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const {push} = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState()
  const [loading, setLoading] = useState(false);
  return (
    <main className="antialiased flex min-h-screen flex-col items-center justify-center bg-slate-100">
      {alert && <Alert msg={alert.msg} type={alert.type}/>}
      <div className="shadow-lg rounded-md p-6 border bg-white">
        <h1 className="font-semibold mb-2">Login</h1>
        <form className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <input type="email" 
              id="email"
              className="px-3 py-2 text-sm text-slate-400 border border-slate-300 rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"/>
          </div>

          <div className="flex flex-col gap-1">
            <input type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 text-sm text-slate-400 border border-slate-300 rounded outline-none"
              placeholder="Password"/>
          </div>
          
          <hr />

          <button type="button"
            className="bg-slate-900 font-semibold rounded py-2 text-white"
            onClick={async (e) => {
              e.preventDefault()
              setLoading(true);
              const { data, error } = await supabase.auth.signInWithPassword({email, password});
              if (error) setAlert({ msg: error.message, type:"error" });
              setLoading(false);
              if (data.session) push("/")
            }}
            disabled={loading}>
            {loading ? '...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  )
}
const Alert = ({ type, msg }) => {
  let style = ""

  switch (type) {
    case "info":
    default:
      style = "bg-blue-100 border-blue-300 text-blue-600"
      break;
    case "error":
      style = "bg-red-100 border-red-300 text-red-600"
      break;
  }

  return (<div className={`text-xs py-2 px-2 flex gap-2 mb-2 w-72 border rounded-md ${style}`}>
    <strong>{type}: </strong>
    <span>{msg}</span>
  </div>)
}
