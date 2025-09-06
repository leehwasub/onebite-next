import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import BookData from "@/types/types";

// export const getStaticProps = async (context : GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books,
//     },
//   }
// }

export default function Page()
{
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async () => {
    const books = await fetchBooks(q);
    setBooks(books);
  }
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      {books.map((book: any) => (
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}