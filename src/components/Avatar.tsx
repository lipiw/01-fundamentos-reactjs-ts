import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css';

//extendendo todas propriedades da tag "<img>" do HTML, todas são opcionais
interface AvaterProps extends ImgHTMLAttributes<HTMLImageElement>{
    hasBorder?: boolean;
}

//Setando valor default para propriedade hasBorder
export function Avatar({hasBorder=true, ...props}: AvaterProps){
    return(
        <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
        />
    )
}