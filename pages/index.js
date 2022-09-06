import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {


  const { data, error } = useSWR('/api/hotels', fetcher)

  console.log(data)


  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.map((data) => (
        <li key={data}>{data.name}</li>
      ))}
    </div>
  )

}
