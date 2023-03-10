import type { NextPage } from 'next'
import { Box, Image, LinkOverlay, LinkBox } from '@chakra-ui/react'
import { client } from 'libs/client';
import { Post } from 'types/blog'
import Slick, { Settings } from 'react-slick';
import { DateTime } from 'components/DateTime'
import styled from 'styled-components'

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

const SliderWrapper = styled.div`
  width: calc(100%);
  .slick-next{ 
    right:0!important;
  };
  .slick-prev{ 
    left:0!important;
  };
  .slick-arrow{ 
    z-index:2!important;
  };
  .slick-prev:before,
  .slick-next:before {
    color: black;
  };
`


const settings: Settings = {
  infinite: true,
  centerMode: true,
  slidesToShow: 2,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 6000,
  cssEase: 'ease-out',
  arrows: true,
  pauseOnHover: true,
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

const FixedWindowLink = ({ href, children }:any) => {
  const handleClick = (e:any) => {
    e.preventDefault();
    window.open(href, '_blank', 'width=680,height=550,status=no,location=no,scrollbars=yes,directories=no,menubar=no,resizable=no,toolbar=no');
  };

  return (
    <div className='title'>
      <LinkOverlay href={href} onClick={handleClick}>{children}</LinkOverlay>
    </div>
  );
};

const NewLogo = ({ date }:any) => {
  const publishDate = new Date(date)
  const now = new Date()
  const diffTime = now.getTime() - publishDate.getTime()
  const diffDays = diffTime / (1000 * 3600 * 24)
  return (
    <>
    {(() => {
      //?????????10?????????????????????New?????????????????????
      if (diffDays <= 10 ) {
        return (
          <div className='background-new'>
            New !
          </div>
        )
      }
    })()}
    </>
  )
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
    <Container>
      <SliderWrapper>
      <Slick {...settings}>
        {
          posts.map((post) => (
            <LinkBox key={post.id} color="white" shadow={"xl"}>
            <NewLogo date={post.publishedAt} />
            <div className="background-info">
              {post.image ? (
                  <Image
                  src={post.image.url}
                  width="300px"
                  height="150px"
                  borderRadius="5px"
                  />
                ) : (
                    <Image src="/noimg.png" alt="No Image" height="150px" width="300px" borderRadius="5px"/>
                )}
              {post.category ? (
                <div className='category'>
                  <div className='background-news'>
                    {post.category}
                  </div>
                  <span className='news-date'><DateTime datetime={post.publishedAt || ""} /></span>
                </div>
              ) : (
                <div className='category'>
                  <div className='background-news'>
                    None
                  </div>
                  <span className='news-date'><DateTime datetime={post.publishedAt || ""} /></span>
                </div>
              )}
              {post.directlink ? (
                //<div className='title'><a href={post.directlink} target="_blank">{post.title}</a></div>
                <div className='title'><LinkOverlay href={post.directlink} target="_blank">{post.title}</LinkOverlay></div>
              ) : (
                <FixedWindowLink href={`/post/topix/${post.id}`}>{post.title}</FixedWindowLink>
                //<div className='title'><a href={`/post/topix/${post.id}`} target="_blank">{post.title}</a></div>
              )}
            </div>
            </LinkBox>
          ))
        }
      </Slick>
      </SliderWrapper>
      </Container>
    </>
  )
}
export default Home