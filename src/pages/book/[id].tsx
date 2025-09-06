import styles from "./[id].module.css";
import {GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";

export const getStaticPaths = async () => {
  return {
    paths: [
      {params : {id : "1"} },
      {params : {id : "2"} },
      {params : {id : "3"} },
    ],
    fallback: false,
  }
}

export const getStaticProps = async (context : GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: {
      book,
    },
  }
}


export default function Page({book}: InferGetStaticPropsType<typeof getStaticProps>)
{
  if (!book) return <div>Book not found</div>;
  const {title, subTitle, description, author, publisher, coverImgUrl} = book;
  return (
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
  );
}