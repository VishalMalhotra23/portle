import React, { useState, useEffect } from "react";
import "./textEditor.css";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertFromRaw,
  convertToRaw,
} from "draft-js";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, []);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContentState));
  };

  const handleBeforeInput = (input) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const text = currentBlock.getText();

    if (text === "#" && input === " ") {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "replace-text"
      );

      const newEditorStateWithHeader = RichUtils.toggleBlockType(
        newEditorState,
        "header-one"
      );

      handleChange(newEditorStateWithHeader);

      return "handled";
    }

    if (text === "*" && input === " ") {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
        }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "replace-text"
      );
      const newEditorStateWithHeader = RichUtils.toggleBlockType(
        newEditorState,
        "bold"
      );
      handleChange(newEditorStateWithHeader);
      return "handled";
    }
    if (text === "**" && input === " ") {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "replace-text"
      );
      const newEditorStateWithHeader = RichUtils.toggleBlockType(
        newEditorState,
        "red-color"
      );
      handleChange(newEditorStateWithHeader);
      return "handled";
    }

    if (text === "***" && input === " ") {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        ""
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "replace-text"
      );
      const newEditorStateWithHeader = RichUtils.toggleBlockType(
        newEditorState,
        "text-underline"
      );

      handleChange(newEditorStateWithHeader);

      return "handled";
    }

    if (text === "@" && input === " ") {
      const newContentState = Modifier.replaceText(
        currentContent,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        ""
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "replace-text"
      );

      const newEditorStateWithHeader = RichUtils.toggleBlockType(
        newEditorState,
        "unstyled"
      );

      handleChange(newEditorStateWithHeader);

      return "handled";
    }
    return "not-handled";
  };

  const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "bold") {
      return "boldText";
    }
    if (type === "text-underline") {
      return "textUnderline";
    }
    if (type === "red-color") {
      return "redColor";
    }
  };

  return (
    <div className="textEditorSection">
      <div className="save">
        <button className="saveButton" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="editor">
        <Editor
          blockStyleFn={myBlockStyleFn}
          editorState={editorState}
          onChange={handleChange}
          handleBeforeInput={handleBeforeInput}
        />
      </div>
    </div>
  );
};

export default TextEditor;
