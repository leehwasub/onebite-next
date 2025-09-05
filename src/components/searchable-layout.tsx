import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./searchable-layout.module.css";

export default function SearchableLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmit = () => {
    if (search.trim() === "" || search === q) return;
    router.push(`/search?q=${search}`);
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <div>
      <div className={styles.searchbar_container}>
        <input value={search} onChange={onChangeSearch} onKeyDown={onKeyDown} placeholder="검색어를 입력하세요...." />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}