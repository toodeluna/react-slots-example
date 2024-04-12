import "../styles/article.css";
import { JSX } from "react";
import { useSlots } from "../hooks/useSlots";
import { PropsWithChildren } from "react";

function Article(props: PropsWithChildren): JSX.Element {
  const slots = useSlots(props.children, {
    title: ArticleTitle,
    content: ArticleContent,
    tags: {
      component: ArticleTag,
      array: true,
    },
  });

  return (
    <article className="article">
      {slots.title}
      {slots.content}
      {slots.tags && <div className="tags">{slots.tags}</div>}
    </article>
  );
}

function ArticleTitle(props: { children: string }): JSX.Element {
  return <h1>{props.children}</h1>;
}

function ArticleContent(props: { children: string }): JSX.Element {
  return <p>{props.children}</p>;
}

function ArticleTag(props: { children: string }): JSX.Element {
  return <span>{props.children}</span>;
}

export default Object.assign(Article, {
  Title: ArticleTitle,
  Content: ArticleContent,
  Tag: ArticleTag,
});
