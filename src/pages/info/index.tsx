import type { NextPage } from "next";
import { client } from "libs/client";
import { Post } from "types/blog";
import { CarouselComponent } from "components/Carousel";

export const getStaticProps = async () => {
  const data = await client.getList<Post>({
    endpoint: "info",
    queries: { fields: "id" },
  });
  const totalCount = data.totalCount;
  const allData = await client.getList<Post>({
    endpoint: "info",
    queries: { limit: totalCount },
  });
  return {
    props: {
      posts: allData.contents,
    },
  };
};

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return <CarouselComponent posts={posts} detailPath="/post/info/" />;
};
export default Home;
