import React, { useState } from "react";

import { Button, Input } from "antd";
import { PencilSquareIcon } from "@assets/icons";
import { Drawer } from "@seller/components";

import { useUpdateUserProfile } from "../hooks";

const AddDescription = ({ profile = {} }) => {
  const [descriptionMode, setDescriptionMode] = useState(false);
  const [description, setDescription] = useState(profile.description || "");
  const [updateUserProfile, loading] = useUpdateUserProfile();

  const handleSave = () => {
    updateUserProfile({ description });
    setDescriptionMode(false);
  };

  return (
    <div>
      {profile.description ? (
        <p className='align-middle'>
          {profile.description}
          <PencilSquareIcon
            width='16px'
            className='inline-block cursor-pointer text-blue-500 mx-1'
            onClick={() => setDescriptionMode(true)}
          />
        </p>
      ) : (
        <p
          className='text-[#107ADD] font-semibold cursor-pointer inline-block'
          onClick={() => setDescriptionMode(true)}
        >
          Add Description
        </p>
      )}
      <Drawer
        closable={false}
        onClose={() => setDescriptionMode(false)}
        open={descriptionMode}
        height='auto'
        title={null}
      >
        <div className='p-4'>
          <h3 className='font-semibold text-xl text-center'>
            Add Profile Description
          </h3>
          <Input.TextArea
            placeholder='Add Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            maxLength={200}
            className='my-4'
          />
          <Button
            className='w-full bg-primary font-semibold h-10 my-4'
            type='primary'
            loading={loading}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default AddDescription;
