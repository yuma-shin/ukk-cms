import type { MicroCMSListContent } from "microcms-js-sdk";

export type Post = {
    title: string;
    tag: any;
    category: any;
    directlink: string;
    description: string;
    image: any;
    text: string;
} & MicroCMSListContent