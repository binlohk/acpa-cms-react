import React, { useContext } from 'react';
import Button from '../../utilComponents/Button';
import { UserContext } from '../../../contexts/UserContext';

const CourseMaterials = ({ courseMaterials }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const handleClick = async (event, material) => {
      window.open(`http://localhost:1337${material.url}`);
  }

  return (
    <div>
        {
            courseMaterials?
            <div>
                {courseMaterials.map((courseMaterial)=>
                <div key={courseMaterial.id} >
                    <div className="text-2xl border-b-4">{courseMaterial.title}</div>
                    <div className="py-6">{courseMaterial.materialDescription}</div>
                    <Button onClickMethod={(event)=>handleClick(event, courseMaterial.material)}>Download</Button>
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