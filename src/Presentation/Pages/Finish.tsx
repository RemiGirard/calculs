import {useRouter} from "@/Presentation/Router.tsx";

export default () => {
  const {navigate} = useRouter();

  return (<div>
    Finish
    <button onClick={() => navigate('generateExercises')}>Home</button>
  </div>);
}
