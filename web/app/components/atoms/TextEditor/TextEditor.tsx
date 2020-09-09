import * as React from 'react';
import injectStyles from '../../../utils/injectStyles';
import styles from './TextEditor.style';
import { ITextEditorProps } from './types';
// @ts-ignore
import CKEditor from "react-ckeditor-component";

// To Do: check if it can be replace with functional component
class TextEditor extends React.PureComponent<ITextEditorProps, any> {
  state = {
    value: ""
  }

  componentDidMount() {
    const { inputVal } = this.props;
    this.setState({
      value: inputVal
    })
  }

  componentWillReceiveProps(nextProps: ITextEditorProps) {
    if (this.props !== nextProps) {
      this.setState({ 
        value: nextProps.inputVal
      });
     }
  }

  onChange = (evt: any) => {
    const { className, inputVal ="", onChangeHandler = () => {}, ...otherProps } = this.props;
    const value = evt.editor.getData();
    console.log(value);
    this.setState({
      value
    })
    onChangeHandler(value)
}

  render() {
    const { className, inputVal, onChangeHandler = () => {}, ...otherProps } = this.props;
    return (
      <div className={className}>
          <CKEditor 
            events={{
              "change": this.onChange
            }}
            content={this.state.value}
           />
    </div>)
  }
}

// const TextEditor: React.FC<ITextEditorProps> = (props: ITextEditorProps) => {
//     const { className, inputVal ="", onChangeHandler = () => {}, ...otherProps } = props;
//     const [value, setValue] = React.useState<string>(inputVal);

//     const onChange = (evt: any) => {
//         const value = evt.editor.getData();
//         console.log(value);
//         setValue(value);
//         onChangeHandler(value)
//     }

//     return (
//         <div className={className}>
//             <CKEditor 
//               events={{
//                 "change": onChange
//               }}
//               content={value}
//              />
//       </div>
//     )
// }

export default injectStyles(TextEditor, styles);