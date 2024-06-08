import {useState} from "react";

import {PageName} from "@/Domain/page";
import GenerateExercises from "@/Presentation/Pages/GenerateExercices";
import PageNotFound from "@/Presentation/Pages/PageNotFound";

function App() {
  // no use of any router, just a simple page switch
  const defaultPage: PageName = 'generateExercises';
  const [page, setPage] = useState<PageName>(defaultPage);

  switch (page) {
    case 'generateExercises':
      return <GenerateExercises />;
    // case 'game':
    //   return <Game />;
    // case 'finish':
    //   return <Finish />;
    // case 'config':
    //   return <Config />;
    default:
      return <PageNotFound setRootPage={() => setPage(defaultPage)}/>;
  }
}

export default App;
