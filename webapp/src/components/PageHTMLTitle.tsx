import { PropsWithChildren } from 'react';
import ReactHelmet from 'react-helmet';

type IPageHTMLTitleProps = PropsWithChildren<{
    title: string;
}>;

export const PageHTMLTitle = (props: IPageHTMLTitleProps) => {
    return <ReactHelmet title={`${props.title} | The Dwarven Tavern`}>{props.children}</ReactHelmet>;
};
