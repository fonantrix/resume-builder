import styled, { css } from 'styled-components';
import { IFormProps } from './types';

export default css<IFormProps>`
    
`;

export const UploadWrapper = styled.div`

`
export const FormHeader = styled.div`
    display: flex;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    align-items: center;
    img:first-child {
        width: 20px;
        height: 20px;
        margin-right: 30px;
    }
`

export const FileBgImage = css`
    width: 100px;
    height: 100px;
`;

export const Wrapper = styled.div`
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    padding-right: 35px;

    form {
        width: 100%;
    }
`;