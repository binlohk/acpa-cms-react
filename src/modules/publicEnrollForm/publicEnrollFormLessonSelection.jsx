import {Parser} from 'html-to-react';
import DOMPurify from 'dompurify';

export default function PublicEnrollFormLessonSelection({ lessons, lessonSelectionCallback }) {
    function extractUrlValue(key, url) {
        if (typeof(url) === 'undefined')
        url = window.location.href;
        var match = url.match(key + '="([^&]+)">');
        return match ? match[1] : null;
    }
    function GetyouTubeVideoToken(YoutubeVideoUrl){
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (YoutubeVideoUrl.match(p)) ? RegExp.$1 : false;
    }
lessons.forEach((lesson) => {
    if (lesson.CoursePromoContent) {
        var value = extractUrlValue('url', lesson.CoursePromoContent);
        if(value){
            var ViToken = GetyouTubeVideoToken(value);
            lesson.VideoToken =ViToken 
        }
    }
});

    return (
        <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">選擇參加場次*：</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
                {lessons.map((lesson) =>
                    <label className="inline-flex items-center gap-2" key={lesson.id}>
                        {lesson.CoursePromoContent && <input type="radio" className="form-radio" name="lesson" value={lesson.id} onClick={
                            (e) => {
                                lessonSelectionCallback(e.target.value)
                            }
                        }/>}
                        
                        <span>
                            {Parser().parse(DOMPurify.sanitize(lesson.CoursePromoContent))}
                        {
                            lesson.VideoToken ? <>
                                <iframe
                                width="550"
                                height="300"
                                src={`https://www.youtube.com/embed/${lesson.VideoToken}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                                />
                            </> : ''
                        }
                        </span>
                    </label>  
                )}
            </div>
        </div>
    )
}