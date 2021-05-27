import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const CourseMaterials = ({ courseMaterials }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const handleClick = async (event) => {

  }

  return (
    <div>
        {
            courseMaterials?
            <div>
                {courseMaterials.map((material)=>
                <div key={material.id} >
                    <div className="text-2xl border-b-4">{material.title}</div>
                    <div className="py-6">{material.materialDescription}</div>
                </div>
                )}
            </div>
            :
            '這個課程沒有任何材料'
        }
    </div>
  )
}

export default CourseMaterials;