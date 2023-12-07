"use client"

import React, {useState} from 'react';
import Button from "@/lib/Button";
import {useRouter} from "next/navigation";
import Textfield from "@/lib/Textfield";
import TextfieldMulti from "@/lib/TextfieldMulti";
import Dropzone from "react-dropzone";

const AddProperty = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [supply, setSupply] = useState<string>("1");
  const [description, setDescription] = useState<string>("");

  const onBtnCreate = () => {
    console.log("onBtnCreate")
    console.log(name)
    console.log(supply)
    console.log(description)
  }

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  };

  const onChangeSupply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupply(event.target.value)
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value)
  };

  return (
      <main className={`flex flex-col`}>
        <div className={"flex justify-center w-full"}>

          <div className={"w-96 p-5 flex flex-col gap-1"}>

            <section className={"w-32"}>
              <Button onClick={() => router.back()} title={"Back"}/>
            </section>

            <section className={"mt-4"}>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section {...getRootProps()} className="
                    flex items-center justify-center h-64 border-dotted border-2 border-amber-700 rounded-md bg-zinc-50
                    hover:bg-gray-100 hover:border-amber-600 hover:text-amber-700 hover:border
                    transition-colors duration-200 cursor-pointer">
                      <div className="text-center">
                        <input {...getInputProps()} />
                        <p className="text-amber-700">Drag and drop media</p>
                      </div>
                    </section>
                )}
              </Dropzone>

            </section>

            <section>
              <Textfield title={"Name"} onChange={event => onChangeTitle(event)}/>
            </section>

            <section>
              <Textfield defaultValue={supply} title={"Supply"} onChange={event => onChangeSupply(event)}/>
            </section>

            <section>
              <TextfieldMulti onChange={event => onChangeDescription(event)} title={"Description"}
                              placeholder={"Description"}/>
            </section>

            <section className={"w-32 mt-4"}>
              <Button onClick={() => onBtnCreate()} title={"Create"}/>
            </section>
          </div>

        </div>
      </main>
  );
};

export default AddProperty;
