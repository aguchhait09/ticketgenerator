import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';

const Editor = forwardRef<unknown, React.ComponentProps<typeof ReactQuill> & {onInit?:React.MutableRefObject<ReactQuill|null>}>((props) => {

  return (
    <ReactQuill {...props} ref={props?.onInit}  />
  );
});

export default Editor;
