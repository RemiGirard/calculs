import React from 'react';

import { createRouterInterface } from '@/Presentation/createRouterInterface.ts';
import { PageName } from '@/Domain/page.ts';
import createRouterSwitchImplementation from '@/Infrastructure/Router/createRouterSwitchImplementation.tsx';

const createRouter: createRouterInterface<PageName> = createRouterSwitchImplementation<PageName>;

// never rendered (use render props inside Router)
export const Route: React.FC<{name: PageName, render: () => React.ReactElement}> = () =>(<></>);

const Router = createRouter({
  defaultPage: 'generateExercises',
});

export const RouterProvider = Router.Provider;
export const { useRouter } = Router;
