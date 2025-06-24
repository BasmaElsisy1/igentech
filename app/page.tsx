import { fetchServer } from "@/api/general";
import Services from "./_components/Services";

export default async function Page() {
  const Data = await fetchServer('software-development');
  return (
   <Services data={Data.data} />
  );
}
