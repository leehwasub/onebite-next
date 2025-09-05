// CSS Module
import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';

//서버 사이드 랜더링
export const getServerSideProps = () => {
  //컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  console.log("getServerSideProps");
  const data = "hello";
  return {
    props: {
      data,
    },
  }
};

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(props.data);
  useEffect(() => {
    console.log(window);
  }, []);
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book}/>
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}