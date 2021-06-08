import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { UserContext } from '../../../contexts/UserContext';

const CourseMaterials = ({ courseMaterials, purchased }) => {
  const { getUser } = useContext(UserContext);
  const user = getUser();

  const handleClick = async (event, courseMaterial) => {
    if (courseMaterial.material) {
      window.open(`http://localhost:1337${courseMaterial.material.url}`);
    } else if (courseMaterial.materialUrl) {
      window.open(courseMaterial.materialUrl);
    }
  }

  return (
    <div>
      {
        courseMaterials.length > 0 ?
          <div>
            {courseMaterials.map((courseMaterial) =>
              <div key={courseMaterial.id} className="py-6">
                <div className="text-2xl border-b-4">{courseMaterial.title}</div>
                <div className="py-6">{courseMaterial.materialDescription}</div>
                {
                  (user && user.id && user.id != "") && purchased
                    ?
                    <Button onClick={(event) => handleClick(event, courseMaterial)} color="primary" variant="contained">下載</Button>
                    :
                    <Button disabled variant="contained">你尚未購買此課程</Button>
                }
              </div>
            )}
          </div>
          :
          <p>
            這個課程沒有任何材料
            </p>
      }
    </div>
  )
}

export default CourseMaterials;