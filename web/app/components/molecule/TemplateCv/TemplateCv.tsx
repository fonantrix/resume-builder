import * as React from 'react';
import styles, { BgStyle, BtnSelect, Footer } from './TemplateCv.style';
import injectStyles from '../../../utils/injectStyles';
import { ITemplateComponentProps } from './types';
import BackgroundImage from '../../atoms/BackgroundImage';
import Button from '../../atoms/Button';
import { SelectTemplatePage } from '../../../constants';

const TemplateCv: React.FC<ITemplateComponentProps> = (props: ITemplateComponentProps) => {
    const { className, imageUrl, author, templateCurrency, templateCost, id, selectHandler, previewHandler } = props;

    const bgImgProps = { imageUrl, inheritedStyles: BgStyle };

    return (
        <div className={className}>
            <BackgroundImage {...bgImgProps} />
            <div className="overlay">
                <Button onClick={() => { selectHandler(id) }} inheritedStyles={ BtnSelect } btnStyle="btn--blue" labelText={SelectTemplatePage.selectBtnTxt}/>
                <Button onClick={previewHandler} btnStyle="btn--blue" labelText={SelectTemplatePage.previewBtnTxt}/>
            </div>
            <Footer>
                <span>{author}</span> <span>{`${templateCurrency}${templateCost}`}</span>
            </Footer>
        </div>
    )
}

export default injectStyles(TemplateCv, styles)