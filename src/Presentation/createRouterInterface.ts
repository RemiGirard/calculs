import React from "react";

export type RouteElementType<PageName> = React.ReactElement<{name: PageName, render: () => React.ReactElement}>;

export type Config<PageName extends string> = {
    defaultPage?: PageName;
    notFoundPage?: PageName;
};

export type createRouterInterface<PageName extends string> = (config: Config<PageName>) =>  {
    Provider: React.FC<{children: RouteElementType<PageName>[]}>;
    useRouter: () => {page: PageName, navigate: (page: PageName) => void};
};