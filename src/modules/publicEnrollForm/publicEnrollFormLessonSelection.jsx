export default function PublicEnrollFormLessonSelection({ lessons, lessonSelectionCallback }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">選擇參加場次*：</h2>
            <div className="grid grid-cols-1 gap-4 text-sm">
                {lessons.map((lesson) =>
                    <label className="inline-flex items-center gap-2" key={lesson.id}>
                        <input type="radio" className="form-radio" name="lesson" value={lesson.id} onClick={
                            (e) => {
                                lessonSelectionCallback(e.target.value)
                            }
                        }/>
                        <span>{(lesson.description ?? "").split("\n")[0]}</span>
                    </label>
                )}
            </div>
        </div>
    )
}