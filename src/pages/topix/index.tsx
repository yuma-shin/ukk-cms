import type { NextPage } from 'next'
import { Heading, Container, Box, Card, CardBody,Image,Text } from '@chakra-ui/react'
import { client } from 'libs/client';
import { Post } from 'types/blog'
import { Header } from 'components/Header';
import Slick, { Settings } from 'react-slick';
import { DateTime } from 'components/DateTime'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const getStaticProps = async () => {
  //const data = await client.getList({ endpoint: "contents" });
  const data = await client.getList<Post>({ endpoint: "topix", queries: { fields: 'id' } });
  const totalCount = data.totalCount
  const allData = await client.getList<Post>({ endpoint: "topix", queries: { limit: totalCount } });
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
  dots: true,
  infinite: true,
  centerMode: true,
  slidesToShow: 2,
  autoplay: true,
  speed: 1000,
  cssEase: 'ease-out',
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
      },
    },
  ],
};

const FixedWindowLink = ({ href, children }:any) => {
  const handleClick = (e:any) => {
    e.preventDefault();
    window.open(href, '_blank', 'width=680,height=550');
  };

  return (
    <div className='title'>
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    </div>
  );
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Slick {...settings}>
        {
          posts.map((post) => (
            <Box key={post.id} color="white" shadow={"xl"}>
            <div className="background-info">
              {post.category ? (
                <div className='background-news'>
                  {post.category.category}
                </div>
              ) : (
                <div className='background-news'>
                  None
                </div>
              )}
                <span className='news-date'><DateTime datetime={post.publishedAt || ""} /></span>
                {post.image ? (
                    <Image
                    src={post.image.url}
                    width="300px"
                    height="150px"
                    />
                  ) : (
                      <Image src="/noimg.png" alt="No Image" height="150px" width="300px"/>
                  )}
                {post.directlink ? (
                  <div className='title'><a href={post.directlink} target="_blank">{post.title}</a></div>
                ) : (
                  <FixedWindowLink href={`/post/topix/${post.id}`}>{post.title}</FixedWindowLink>
                )}
            </div>
            </Box>
          ))
        }
      </Slick>
    </>
  )
}
export default Home