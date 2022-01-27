//  To grab the id we need to fetch specific data for it
export async function getStaticProps(context) {
  const id = context.params.id
  const res = await fetch(`https://swapi.dev/api/vehicles/${id}`)
  const data = await res.json()

  return {
    props: { data },
  }
}

// Fetch from Api and get the data to generate the routes
export async function getStaticPaths() {
  const res = await fetch('https://swapi.dev/api/vehicles')
  const data = await res.json()

  // mapping through api
  const paths = data.results.map((post) => {
    const urlArr = post.url.split('/')
    const id = urlArr[urlArr.length - 2]

    // returns an object, referencing specific id path
    return {
      params: { id: id },
    }
  })

  //  if there is no route to access
  return { paths, fallback: false }
}

export default function Vehicles({ data }) {
  return (
    <div>
      <h1 className='text-center text-xl font-semibold my-6'>{`Vehicle ${data.name}`}</h1>
      <p>
        <span className='font-semibold'>Name:</span> {data.name}
      </p>
      <p>
        <span className='font-semibold'>Model:</span> {data.model}
      </p>
      <p>
        <span className='font-semibold'>Manufacturer:</span> {data.manufacturer}
      </p>
    </div>
  )
}
