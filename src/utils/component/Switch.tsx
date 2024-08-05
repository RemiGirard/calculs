import { FC, ReactElement, ReactNode } from 'react';

export type SwitchProps<T> = {
    expression: T;
    children: ReactElement<CaseProps>[];
}

export interface CaseProps {
    value: unknown;
    children: ReactNode;
}

export const Case: FC<CaseProps> = () => null;

export function Switch({ expression, children }: SwitchProps<unknown>): ReactElement {
  const child = children.find((child) => child.props.value === expression);
  return <div>{child?.props?.children || null}</div>;
}
