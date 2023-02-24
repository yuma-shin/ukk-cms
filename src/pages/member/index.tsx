import type { NextPage } from 'next'
import { Box, Card, CardBody,Image,Text,Link,Heading,Stack, Tag, TagLeftIcon, TagLabel, HStack } from '@chakra-ui/react'
import { client } from 'libs/client';
import { Post } from 'types/blog'
import { Header } from 'components/Header';
import Slick, { Settings } from 'react-slick';
import { DateTime } from 'components/DateTime'
import styled from 'styled-components'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AddIcon } from '@chakra-ui/icons';

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

const settings: Settings = {
  //dots: true,
  infinite: true,
  centerMode: true,
  slidesToShow: 2,
  autoplay: true,
  speed: 1500,
  cssEase: 'ease-out',
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        centerMode: false
      },
    },
  ],
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