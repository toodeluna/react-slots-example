import { JSX } from "react";
import Article from "./components/Article";

export default function App(): JSX.Element {
  return (
    <Article>
      <Article.Title>Title</Article.Title>
      <Article.Content>Content</Article.Content>
      <Article.Tag>Foo</Article.Tag>
      <Article.Tag>Bar</Article.Tag>
    </Article>
  );
}
