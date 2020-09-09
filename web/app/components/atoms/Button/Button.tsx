import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles from './Button.style';
import { IButtonComponentProps } from './types';

const Button: React.FC<IButtonComponentProps> = (props: IButtonComponentProps) => {
  const { className, labelText, btnStyle, onClick,...otherProps } = props;
    
    return (
      <div className={className}>
        <button  className={`${btnStyle}`} onClick={onClick}>
          <span>{ labelText }</span>
        </button>
      </div>
    );
}

export default injectStyles(Button, styles);
