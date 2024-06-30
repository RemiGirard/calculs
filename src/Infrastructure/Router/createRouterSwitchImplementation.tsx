import React, { useContext, useState } from 'react';

import type { createRouterInterface, RouteElementType } from '@/Presentation/createRouterInterface.ts';

export default <GenericPageName extends string>(...[partialConfig]: Parameters<createRouterInterface<GenericPageName>>) => {
  const RouterContext = React.createContext<null|{page: GenericPageName, setPage:(newPage: GenericPageName)=>void }>(null);

  const useRouter = () => {
    const { page, setPage } = useContext(RouterContext) ?? { page: '', setPage: () => { console.log('No router provider found'); } };
    return { page, navigate: setPage };
  };

  function Renderer({ page, routes }:{page: GenericPageName, routes: RouteElementType<GenericPageName>[]}) {
    const notFoundRoute = routes.find((route) => route.props.name === partialConfig?.notFoundPage) ?? routes[0];

    const findRoute = (page: GenericPageName|undefined): RouteElementType<GenericPageName>|undefined => routes.find((route) => route.props.name === page);

    const render = (page: GenericPageName|undefined): () => React.ReactNode => {
      const route = findRoute(page);
      if (route) {
        return () => route.props.render();
      }
      console.log('Route not found');
      return () => notFoundRoute.props.render();
    };

    return (<div>{render(page)()}</div>);
  }

  const Provider:React.FC<{children: RouteElementType<GenericPageName>[]}> = ({ children }) => {
    if (children.length === 0) throw new Error('Router must have at least one route');
    const [page, setPage] = useState<GenericPageName>(partialConfig.defaultPage ?? children[0].props.name);
    return (
      <RouterContext.Provider value={{ page, setPage }}>
        <Renderer page={page} routes={children} />
      </RouterContext.Provider>
    );
  };

  return { useRouter, Provider } as ReturnType<createRouterInterface<GenericPageName>>;
};
