import type { NextPage } from 'next'
import { Box, Link, Heading,Stack, Tag, TagLabel, HStack } from '@chakra-ui/react'
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

const FixedWindowLink = ({ href, children }:any) => {
  const handleClick = (e:any) => {
    e.preventDefault();
    window.open(href, '_blank', 'width=680,height=550,status=no,location=no,scrollbars=yes,directories=no,menubar=no,resizable=no,toolbar=no');
  };

  return (
    <div>
      <a href={href} onClick={handleClick}>{children}</a>
    </div>
  );
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
              <FixedWindowLink href={`/post/member/${post.id}`}>
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
              </FixedWindowLink>
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