const Switch = ({ expression, children }) => {
    return children.find((child) => child.props.value === expression);
};

const Case = ({children}) => children;

export {Switch, Case};