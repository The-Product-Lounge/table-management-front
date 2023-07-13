"use client";

import { store } from "../../old/store/store";
import { Provider } from "react-redux";

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
