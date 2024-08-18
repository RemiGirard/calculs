import {navigate} from "@/Presentation/createRouterInterface.ts";
import {PageName} from "@/Domain/page.ts";

export default (navigate: navigate<PageName>) => {
  navigate('generateExercises');
};
