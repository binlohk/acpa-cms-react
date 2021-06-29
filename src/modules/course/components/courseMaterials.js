import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { UserContext } from '../../../contexts/UserContext';
import AttachmentIcon from '@material-ui/icons/Attachment';

const CourseMaterials = ({ courseMaterials, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const handleClick = async (event, courseMaterial) => {
    if (courseMaterial.material) {
      window.open(`${process.env.REACT_APP_BACKEND_SERVER}${courseMaterial.material.url}`);
    } else if (courseMaterial.materialUrl) {
      window.open(courseMaterial.materialUrl);
    }
  }

  return (
    <div>
      <div className="rounded-t py-3 border-b-2">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center gap-x-2 relative w-full px-4 max-w-full">
            <h3 className="font-semibold text-lg">
              可供下載
                      </h3>
            <div className='bg-yellow-600 text-white px-2 rounded-sm font-semibold'>
              {courseMaterials.length}
            </div>
          </div>
        </div>
      </div>
      {
        courseMaterials.length > 0 ?
          <div>
            {courseMaterials.map((courseMaterial) =>
              <div key={courseMaterial.id} className="py-6">
                <div className='py-6 px-4 flex justify-between bg-gray-300 rounded-md'>
                  <div className='flex justify-center items-center'>
                    <AttachmentIcon />
                    <h2 className='pl-4 font-bold text-xl'>{courseMaterial.title}</h2>
                    <p className='pl-4'>{courseMaterial.materialDescription}</p>
                  </div>

                  {
                    (user && user.id && user.id != "") && purchased
                      ?
                      <Button
                        style={{ background: '#235789' }}
                        className='inline-flex items-center justify-center my-2 px-3 py-2 border border-transparent rounded-3xl shadow-sm text-xs font-bold'
                        onClick={(event) => handleClick(event, courseMaterial)} variant="contained">
                        <span className='text-white'>
                          下載
                          </span>
                      </Button>
                      :
                      <Button disabled variant="contained">你尚未購買此課程</Button>
                  }
                </div>
              </div>
            )}
          </div>
          :
          <p className='p-4'>
            這個課程沒有任何材料
            </p>
      }
    </div>
  )
}

export default CourseMaterials;