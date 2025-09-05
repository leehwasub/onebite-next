import { useRouter } from "next/router";
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";

export default function Page()
{
  const router = useRouter();

  const {q} = router.query;

  return (
    <div>
      <h1>Search {q}</h1>
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}