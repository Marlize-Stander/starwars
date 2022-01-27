import Link from 'next/Link';

// Data fetching during build time
export async function getStaticProps(context) {
  const res = await fetch('https://swapi.dev/api/people/');
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

export default function People({ data }) {
  return (
    <div>
      <h1 className="text-center text-xl font-semibold my-6">People</h1> 
      <div className="flex flex-wrap justify-center">
       {data.results.map(people => {
        const urlArr = people.url.split("/");
        const id = urlArr[urlArr.length - 2];

        return (
         <div className="mx-2 mb-2 bg-gray-700 py-2 px-4 rounded-md text-white">
           <Link href={`/people/${id}`}>{people.name}</Link>
         </div>
        )
       })}
       </div>     
    </div>
  )
}