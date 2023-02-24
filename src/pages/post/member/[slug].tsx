import { client } from "libs/client";
import type { Post } from "types/blog";
import type { GetStaticPaths, GetStaticProps, } from "next";
import { MarkdownTemplate } from 'components/MarkdownTemplate'
import {
    Box,
    Container,
    Divider,
    Stack,
    Button,
    HStack,
    Text
} from "@chakra-ui/react";
import React from "react";
import { Header } from "components/Header";
import { DateTime } from "components/DateTime";

type Props = {
    post: Post
}

export default function Article({ post }: Props) {
    const CloseButton = () => {
          (window as Window).close();
    };
    return (
        <>
        <Header title={post.title}/>
        <Container as="main" maxW="container.md" marginTop="4" marginBottom="16">
            <Stack spacing="8">
                <Box display='flex' justifyContent='right' alignItems='right'>
                    <HStack mr={5}>
                        <Text>公開日 : </Text>
                        <DateTime datetime={post.publishedAt || ""} />
                    </HStack>
                    <HStack mr={5}>
                        <Text>更新日 : </Text>
                        <DateTime datetime={post.updatedAt || ""} />
                    </HStack>
                </Box>
            </Stack>
            <Divider marginY="4" />
            {/* 記事本文 */}
            <MarkdownTemplate source={post.text} />
            <Box display='flex' justifyContent='right' alignItems='right' mt={10}>
                <Button onClick={CloseButton}>Close</Button>
            </Box>
        </Container >
        </>
    )
}

/* 記事詳細の静的ファイルの作成 */
export const getStaticPaths: GetStaticPaths = async () => {
    // limitがデフォルトで10なので、記事数が10以上になると古い記事が生成されない
    // そのため、一旦totalCountを取得して、limitに指定してリクエストを投げる。
    const data = await client.getList<Post>({ endpoint: "members", queries: { fields: 'id' } });
    const totalCount = data.totalCount
    const allData = await client.getList<Post>({ endpoint: "members", queries: { limit: totalCount } });
    const paths = allData.contents.map((content) => `/post/member/${content.id}`);
    return { paths, fallback: false };
};

// パラメーターから記事詳細データを取得
export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
    if (!params) throw new Error("Error Slug Not Found");
    const slug = params.slug;
    const data = await client.getListDetail<Post>({ endpoint: "members", contentId: slug });
    return {
        props: {
            post: data,
        },
    };
};