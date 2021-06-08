import React, { useState, useEffect, useContext } from 'react';
import Video from '../../../utilComponents/video';
import { httpClient } from '../../../../services/api/axiosHelper';
import { UserContext } from '../../../../contexts/UserContext';

const Lesson = ({ lessonId }) => {
    const { getUser } = useContext(UserContext);
    const user = getUser();

    const [lessonData, setLessonData] = useState(null);

    const fetchLessonData = async (lessonId) => {
        if (user && user.id !== "" && user.id !== null) {
            try {
                const result = await httpClient.get(`http://localhost:1337/lessons/${lessonId}`)
                setLessonData(result.data);
                console.log(result.data);
            } catch (e) {
                console.log(e)
            }
        }
    };

    useEffect(() => {
        fetchLessonData(lessonId);
    }, []);


    return (
        <div className='m-6'>
            123
            {lessonData &&
                <div>
                    <Video videoUrl={lessonData.videoUrl} width='640' height='360' />
                    <div>{lessonData.lessonDescription}</div>
                </div>
            }
        </div>
    )
}

export default Lesson
