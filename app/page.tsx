"use client"
import { getToken } from "@/lib/service/helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const token = getToken();
  const navigate = useRouter();
  useEffect(() => {
    if(!token){
      navigate.push("/auth/login");
    }else{
      navigate.push('/dashboard')
    }
  }, [])
  if (!token) {
    return;
  }
  return (
    <div></div>
  );
}
