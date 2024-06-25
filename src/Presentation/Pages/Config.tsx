import {useRouter} from "@/Presentation/Router.tsx";
import Config from "@/Domain/Config.ts";

export default ({config}: {config: Config, setConfig: (newConfig: Config) => void}) => {
    const {navigate} = useRouter();

    return (<>
        <h1>Config</h1>
        <button onClick={()=>navigate('generateExercises')}>go generate</button>
        <>
            {JSON.stringify(config)}
        </>
    </>);
};
