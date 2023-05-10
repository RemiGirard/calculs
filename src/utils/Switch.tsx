const Switch = ({ expression, children }:any): any => {
    return children.find((child:any) => child.props.value === expression);
};

const Case = ({children}: any) => children;

export {Switch, Case};