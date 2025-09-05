import { useRouter } from "next/router";

export default function Page()
{
  const router = useRouter();
  console.log(router);
  const {id} = router.query;
  console.log(id);
  return (
    <div>
      <h1>Book {id}</h1>
    </div>
  );
}