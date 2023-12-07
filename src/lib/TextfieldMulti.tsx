import React from 'react';

interface TextfieldMultiProps {
  title: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextfieldMulti = (props: TextfieldMultiProps) => {
  return (
      <div>
        <label className="form-control">
          <div className="label">
            <span className="text-amber-700">{props.title}</span>
          </div>
          <textarea onChange={props.onChange} className="textarea textarea-bordered h-24
          bg-zinc-50 border-amber-600 bg-opacity-60 hover:border-amber-400
                        focus:ring-1 focus:ring-offset-2 focus:ring-offset-amber-600 focus-visible:border-0 focus:outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-30 text-amber-700
          " placeholder="Type here"></textarea>
        </label>
      </div>
  );
};

export default TextfieldMulti;
