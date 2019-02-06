import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorConvertToHTML extends Component {
    constructor (props) {
        super(props);
        let editorState;
        const { value } = props;
        if (value) {
            const blocksFromHTML = htmlToDraft(value);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            editorState = EditorState.createWithContent(state);
        }
        this.state = {
            editorState: editorState || EditorState.createEmpty()
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const content = draftToHtml(rawContent);
        this.props.onChange(content);
    };

    render () {
        const { editorState } = this.state;
        if (!editorState) return null;
        const { title } = this.props;
        return (
            <div>
                <div style={{
                    color: 'rgba(0, 0, 0, 0.3)',
                    fontSize: 12,
                    textAlign: 'left',
                    marginBottom: 6,
                    marginTop: 14
                }}>{title}</div>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    editorStyle={{
                        padding: 16,
                        minHeight: 250,
                        cursor: 'text',
                        borderWidth: '1px',
                        borderColor: '#F1F1F1',
                        borderStyle: 'solid'
                    }}
                />
            </div>
        );
    }
}

export default EditorConvertToHTML;
