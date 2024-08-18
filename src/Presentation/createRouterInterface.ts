import {FC, ReactElement} from 'react';

export type RouteElementType<PageName> = ReactElement<{name: PageName, render: () => ReactElement}>;

export type Config<PageName extends string> = {
    defaultPage?: PageName;
    notFoundPage?: PageName;
};

export type navigate<PageName extends string> = (page: PageName) => void;

export type createRouterInterface<PageName extends string> = (config: Config<PageName>) => {
    Provider: FC<{children: RouteElementType<PageName>[]}>;
    useRouter: () => {page: PageName, navigate: navigate<PageName>};
};
