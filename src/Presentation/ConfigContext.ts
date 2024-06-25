import {createContext} from "react";
import Config from "@/Domain/Config.ts";

export default createContext<null|Config>(null);
