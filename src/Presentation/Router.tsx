import React from "react";

import {createRouterInterface} from "@/Presentation/createRouterInterface.ts";
import {PageName} from "@/Domain/page.ts";
import createRouterSwitchImplementation from "@/Infrastructure/Router/createRouterSwitchImplementation.tsx";

const createRouter: createRouterInterface<PageName> = createRouterSwitchImplementation<PageName>;

export const Route: React.FC<{name: PageName, render: () => React.ReactElement}> = () => {
    // never rendered (use render props inside Router)
    return (<></>);
}

const Router = createRouter( {
    defaultPage: 'generateExercises',
});

export const RouterProvider = Router.Provider;
export const useRouter = Router.useRouter;


export type RouteComponentType<PageName> = React.ReactElement<{name: PageName, render: () => React.ReactElement}>;

