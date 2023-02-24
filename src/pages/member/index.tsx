import type { NextPage } from 'next'
import { Box, Link,Heading,Stack, Tag, TagLabel, HStack } from '@chakra-ui/react'
import { client } from 'libs/client';
import { Post } from 'types/blog'
import { DateTime } from 'components/DateTime'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const getStaticProps = async () => {
  //const data = await client.getList({ endpoint: "contents" });
  const data = await client.getList<Post>({ endpoint: "members", queries: { fields: 'id' } });
  const totalCount = data.totalCount
  const allData = await client.getList<Post>({ endpoint: "members", queries: { limit: totalCount } });
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
  return (
    <>
      {
        posts.map((post) => (
          <>
          <Box key={post.id}>
            <HStack>
              <Tag size={"md"} variant='subtle' colorScheme='cyan'>
                <TagLabel>{post.category}</TagLabel>
              </Tag>
              <Link href={`/post/member/${post.id}`} target="_blank">
                <DateTime datetime={post.publishedAt || ""} />
                  <Heading
                      as="h2"
                      fontSize="md"
                      lineHeight={1.6}
                      marginTop="1"
                      flex={1}
                      cursor="pointer"
                  >
                      {post.title}
                  </Heading>
              </Link>
            </HStack>
            <Stack mt="5" mb="5" borderBottom="1px" borderColor="gray.300" />
          </Box>
          </>
        ))
      }
    </>
  )
}
export default Home