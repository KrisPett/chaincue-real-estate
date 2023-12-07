import React from 'react';

interface TextfieldProps {
  title: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string
}

const Textfield = (props: TextfieldProps) => {
  return (
      <label className="form-control w-full">
        <div className="label">
          <span className={"text-amber-700"}>{props.title}</span>
        </div>
        <input type="text" placeholder="Type here" defaultValue={props.defaultValue} onChange={props.onChange} className="input input-bordered w-full
        bg-zinc-50 border-amber-600 bg-opacity-60 hover:border-amber-400
                        focus:ring-1 focus:ring-offset-2 focus:ring-offset-amber-600 focus-visible:border-0 focus:outline-none
                        focus-visible:ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-orange-30 text-amber-700
        "/>
      </label>
  );
};

export default Textfield;
