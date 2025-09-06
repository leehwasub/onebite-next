import styles from "./[id].module.css";
import {GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = async () => {
  return {
    paths: [
      {params : {id : "1"} },
      {params : {id : "2"} },
      {params : {id : "3"} },
    ],
    fallback: true,
    //false 무조건 404
    //blocking 은 SSR방식
    //true : SSR방식 + fallback상태의 페이지를반환
  }
}

export const getStaticProps = async (context : GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book){
    return {
      notFound: true,
    }
  }
  return {
    props: {
      book,
    },
  }
}


export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>)
{
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;
  const {title, subTitle, description, author, publisher, coverImgUrl} = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl}/>
        <meta property="og:title" content={title}/>
        <meta property="og:description" content={subTitle}/>
      </Head>
      <div className={styles.container}>
        <div className={styles.cover_img_container} style={{backgroundImage: `url(${coverImgUrl})`}}>
          <img src={coverImgUrl} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
        <div className={styles.author}>
          {author} | {publisher}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  );
}