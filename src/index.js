import React from "react";
import App from "./app";
import { LogBox } from 'react-native'
LogBox.ignoreAllLogs = true
const Kernel = () => <App />;

export default Kernel;
