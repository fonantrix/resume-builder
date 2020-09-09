import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles from './Input.style';
import { IInputProps } from './types';

const Input: React.FC<IInputProps> = React.forwardRef((props: IInputProps, forwardedRef: React.Ref<HTMLInputElement>) => {
    const { className, type, maxLength, placeholder, inputVal = "", readOnly, errorMessage, onChangeHandler , ...otherProps} = props;
    const [value, setValue] = React.useState<string>(inputVal);

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value;
        evt.stopPropagation();
        setValue(value);
        onChangeHandler(value)
    }

    return (
        <div className={className}>
            <input ref={forwardedRef} name={name} type={type} value={ inputVal || value } placeholder={placeholder} readOnly={readOnly} maxLength={ maxLength } onChange={ onChange }
            {...otherProps}
            />
            { errorMessage ? <span>{errorMessage}</span> : null }
      </div>
    )
})

export default injectStyles(Input, styles);