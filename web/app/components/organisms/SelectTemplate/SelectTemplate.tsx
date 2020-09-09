import * as React from 'react';
import styles, { Wrapper } from './SelectTemplate.style';
import injectStyles from '../../../utils/injectStyles';
import Input from '../../atoms/Input';
import { ISelectTemplateProps } from './types';
import { IFieldOptions } from '../../../global/types';
import { SelectTemplatePage } from '../../../constants';
import TemplateCv from '../../molecule/TemplateCv';
import { ITemplateProps } from '../../molecule/TemplateCv/types';
import { ITemplate } from '../../templates/Dashboard/types';
import { Helper } from '../../../utils/Helper';
import Endpoint from '../../../api/endpoint';

const SelectTemplate: React.FC<ISelectTemplateProps> = (props: ISelectTemplateProps) => {
    const { className, data, selectHandler, previewHandler } = props;

    return (
        <div className={className}>
            <h3>{SelectTemplatePage.pageHeading}</h3>
            <Wrapper>
                {
                    data.map((item: ITemplate) => {
                        const bgImgProps: ITemplateProps = { imageUrl: `${Endpoint.static.FIRE_STORE_URL}${Helper.encodeURIComponent(Helper.get(item, 'document.templateThumbnailRef', ''))}?${Endpoint.static.BUCKET_QUERY_PARAM}`, templateCost: Helper.get(item, 'document.templateCost', ''), author: Helper.get(item, 'document.author', ''), templateCurrency: Helper.get(item, 'document.templateCurrency', ''), id: item.ID, selectHandler, previewHandler };
                        return <TemplateCv  previewHandler {...bgImgProps} />
                    })
                }
            </Wrapper>
        </div>
    )
}

export default injectStyles(SelectTemplate, styles)