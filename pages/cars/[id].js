import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'

export default function Car({ car }) {
  const router = useRouter()
  const { id } = router.query

  const [color, setColor] = useState(car.color)

  const changeColor = async () => {
    setColor(Math.random() + 'red')
  }

  return <>
    <Head>
      <title>{car.id} - {car.color}</title>
    </Head>
    <h1>Car: {id} with {color}</h1>
    <button onClick={changeColor}>Change Color</button>
    <img src={car.image} width="300" />
  </>
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`)
  const data = await req.json()

  return {
    props: { car: data }
  }
}

// export async function getStaticProps({ params }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`)
//   const data = await req.json()

//   return {
//     props: { car: data }
//   }
// }

// export async function getStaticPaths() {
//   const req = await fetch('http://localhost:3000/cars.json')
//   const data = await req.json()

//   const paths = data.map(car => {
//     return { params: {id: car.id} }
//   })

//   return {
//     paths,
//     fallback: false
//   }
// }