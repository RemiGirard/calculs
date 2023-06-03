import { ReactNode } from "react";

const BigActionButton = (
  {children, icon, textColor = 'white', color = 'green', colorHover = '',  onClick, style} :{children?: ReactNode; icon?: string; textColor?: string;color: string; colorHover: string; onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>void ; style: any }
  
  ) => {
  return (<div onClick={onClick} style={{color: textColor, backgroundColor : color, borderRadius: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4em', ...style}}>
    {children}
  </div>);
}

export default BigActionButton;