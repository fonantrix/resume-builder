import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles from './Dropdown.style';
import { IDropdownProps, IOption } from './types';
import Input from '../Input';

const Dropdown: React.FC<IDropdownProps> = React.forwardRef((props: IDropdownProps, forwardedRef: React.Ref<HTMLSelectElement>) => {
    const {
        className, defaultValue = "", options = [], title, multiSelect = false, value = 'value', haserror, selectedOptions = () => { }, disabled = false, initialSelected = [], errorMessage,
    } = props;
    const [listOpen, toggleListOpen] = React.useState<boolean>(false);
    const [filterText, setFilterText] = React.useState<string>(defaultValue);
    const [selectedItem, setSelectedItem] = React.useState<any>(initialSelected);

    //   const handleClickOutside = (event) => {
    //     if(event.target.matches('input') && !event.target.matches('label')){
    //       if (myRef && myRef.current && myRef.current.contains(event.target) && !myRef.current.classList.contains('open')) {
    //         //console.log('toggleList--------', event.target,  myRef.current ,myRef.current.contains(event.target));
    //         myRef.current.classList.add('open'); 
    //          toggleListOpen(true);
    //       }else{
    //         myRef.current.classList.remove('open'); 
    //         toggleListOpen(false);
    //       } 
    //      }else if(event.target.matches('div')){
    //       myRef.current.classList.remove('open'); 
    //       toggleListOpen(false);
    //      }
    //   }

    React.useEffect(() => {
        setFilterText(defaultValue);
        // window.addEventListener('mousedown', handleClickOutside, true);
        // return () => {
        //   window.removeEventListener('mousedown', handleClickOutside, true);
        // };
    }, [defaultValue]);

    const toggleList = () => {
        if (options.length === 1) {
            return false;
        }
        // setFilterText('');
        toggleListOpen(!listOpen);
        setSelectedItem(initialSelected.map((item: IOption) => item.value));
    }

    const listClick = (item: IOption) => {
        toggleListOpen(false);
        // myRef.current.classList.remove('open'); 
        const temp = [item.value];
        const filterText = [item.name]
        setFilterText(filterText.join(','));
        setSelectedItem(temp);
        selectedOptions(temp);
    }

    const checkBoxValue = (status: Boolean, option: IOption) => {
        let temp = [...selectedItem];
        if (status) {
            temp.push(option.value);
            setSelectedItem(temp);
            selectedOptions(temp);
        } else {
            temp.splice(temp.indexOf(option.value), 1);
            setSelectedItem(temp);
            selectedOptions(temp);
        }

        // multi select show select options name
        const filterTxtArr = [];
        for (let i = 0; i < options.length; i++) {
            let opt = options[i];
            if (temp.indexOf(opt.value) !== -1) {
                filterTxtArr.push(opt.name);
            }
        }
        setFilterText(filterTxtArr.join(','));
    }
    return (
        <div className={className}>
            {title
                ? <div onClick={toggleList} className='lbl--wrpr'>
                    <Input
                        placeholder={title}
                        onClick={toggleList}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterText(event.target.value)}
                        value={filterText}
                        haserror={haserror}
                        disabled={disabled}
                        errorMessage={errorMessage}
                        readonly={true}
                    />
                    <span className="arrow">&#9662;</span>
                </div>
                : null
            }
            {listOpen ?
                <ul className='lst-wrpr'>
                    {options.map(option =>
                        (
                            <li
                                key={option.value} value={option.value}
                                // @ts-ignore
                                selected={option.value}
                                onClick={!multiSelect ? () => listClick(option) : null}
                            >
                                <label>
                                    {multiSelect ? <input checked={selectedItem.indexOf(option.value) !== -1} type="checkbox" onChange={(event) => checkBoxValue(event.target.checked, option)} value={option.value} /> : null}{option.name}</label>
                            </li>
                        ))
                    }
                </ul>
                : null
            }
        </div>);
})

export default injectStyles(Dropdown, styles);