import type { ReactNode } from "react";

import * as S from "./style";

export const Card = ({ children }: { children: ReactNode }) => {
  return <S.Card>{children}</S.Card>;
};
