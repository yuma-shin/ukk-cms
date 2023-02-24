import {
    BoxProps,
    Box,
    Text,
    UnorderedList,
    OrderedList,
    Heading,
    ListItem,
} from "@chakra-ui/react";
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';

type MarkdownTemplateProps = {
    source: string;
} & BoxProps;

const h1 = {
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: "1.25",
        fontWeight: "600",
        pb: ".3em",
        fontSize: "2em",
        borderBottom: "1px solid #E7ECF2",
    },
};

const h2 = {
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: "1.25",
        fontWeight: "600",
        pb: ".3em",
        fontSize: "1.5em",
        borderBottom: "1px solid #E7ECF2",
    },
};

const h3 = {
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: "1.25",
        fontWeight: "600",
        fontSize: "1.25em",
    },
};

const p = {
    props: {
        lineHeight: "1.8",
        mb: "10px",
        fontSize: "15px",
        color: "##000",
    },
};

const ul = {
    props: {
        my: "1",
        lineHeight: "2",
        pl: "1em"
    },
};

const ol = {
    props: {
        my: "1",
        lineHeight: "2",
        pl: "1em"
    }
};

const li = {
    props: {
        fontSize: "15px"
    },
};

const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
        if (domNode.type === "tag") {
            if (domNode.name === "h1") {
                return (
                    <Heading as="h1" {...h1.props}>
                        {domToReact(domNode.children, options)}
                    </Heading>
                );
            }
            if (domNode.name === "h2") {
                return (
                    <Heading as="h2" {...h2.props}>
                        {domToReact(domNode.children, options)}
                    </Heading>
                );
            }
            if (domNode.name === "h3") {
                return (
                    <Text as="h3" {...h3.props}>
                        {domToReact(domNode.children, options)}
                    </Text>
                );
            }
            if (domNode.name === "ul") {
                return (
                    <UnorderedList {...ul.props}>
                        {domToReact(domNode.children, options)}
                    </UnorderedList>
                );
            }
            if (domNode.name === 'ol') {
                return (
                    <OrderedList {...ol.props}>
                        {domToReact(domNode.children, options)}
                    </OrderedList>
                )
            }
            if (domNode.name === "li") {
                return (
                    <ListItem {...li.props}>
                        {domToReact(domNode.children, options)}
                    </ListItem>
                )
            }            
            if (domNode.name === "p") {
                return (
                    <Text {...p.props}>{domToReact(domNode.children, options)}</Text>
                );
            }           
        }
    }
}

export const MarkdownTemplate = (props: MarkdownTemplateProps) => {
    return <Box {...props}>{parse(props.source, options)}</Box>;
};