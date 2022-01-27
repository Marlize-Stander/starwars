import Link from 'next/Link';

// Data fetching during build time
export async function getStaticProps(context) {
  const res = await fetch('https://swapi.dev/api/vehicles/');
  const data= await res.json();

  if (!data) {
   return {
    notFound: true,
   }
  }

  // passing props to the component we need
   return {
    props: { data }
  }
}

export default function Vehicles({ data }) {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold my-6">Vehicles</h1> 
      <div className="flex flex-wrap justify-center">
       {data.results.map(vehicles => {
        const urlArr = vehicles.url.split("/");
        const id = urlArr[urlArr.length - 2];

        return (
         <div className="mx-2 mb-2 bg-gray-700 py-2 px-4 rounded-md text-white">
           <Link href={`/vehicles/${id}`}>{vehicles.name}</Link>
         </div>
        )
       })}
       </div>     
    </div>
  )
}