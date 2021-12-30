import { Parser } from 'html-to-react';
import DOMPurify from 'dompurify';

export default function PublicEnrollFormLessonSelection({
    lessons,
    lessonSelectionCallback
}) {
    function extractUrlValue(key, url) {
        if (typeof url === 'undefined') url = window.location.href;
        var match = url.match(key + '="([^&]+)">');
        return match ? match[1] : null;
    }
    function GetyouTubeVideoToken(YoutubeVideoUrl) {
        var p =
            /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return YoutubeVideoUrl.match(p) ? RegExp.$1 : false;
    }

    lessons.forEach((lesson) => {
        if (lesson.CoursePromoContent) {
            var value = extractUrlValue('url', lesson.CoursePromoContent);
            if (value) {
                var ViToken = GetyouTubeVideoToken(value);
                lesson.VideoToken = ViToken;
            }
        }
    });

    return (
        <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">
                選擇參加場次*：
            </h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
                {lessons &&
                    lessons[0]?.date.map((lesson) => (
                        <label
                            className="inline-flex items-center gap-2"
                            key={lesson.id}
                        >
                            {lesson.date && (
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="lesson"
                                    value={lesson.id}
                                    onClick={(e) => {
                                        lessonSelectionCallback(e.target.value);
                                    }}
                                />
                            )}

                            <span>
                                <div className="flex flex-col">
                                    {lesson.date && (
                                        <>
                                            <div className="font-semibold">
                                                {new Date(
                                                    Parser().parse(
                                                        DOMPurify.sanitize(
                                                            lesson.date
                                                        )
                                                    )
                                                ).getDate() +
                                                    ' ' +
                                                    new Date(
                                                        Parser().parse(
                                                            DOMPurify.sanitize(
                                                                lesson.date
                                                            )
                                                        )
                                                    ).toLocaleDateString(
                                                        'default',
                                                        { month: 'long' }
                                                    ) +
                                                    ' ' +
                                                    new Date(
                                                        Parser().parse(
                                                            DOMPurify.sanitize(
                                                                lesson.date
                                                            )
                                                        )
                                                    ).getFullYear() +
                                                    ' ' +
                                                    new Date(
                                                        Parser().parse(
                                                            DOMPurify.sanitize(
                                                                lesson.date
                                                            )
                                                        )
                                                    ).toLocaleString('en-US', {
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true
                                                    })}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </span>
                        </label>
                    ))}
            </div>
        </div>
    );
}
