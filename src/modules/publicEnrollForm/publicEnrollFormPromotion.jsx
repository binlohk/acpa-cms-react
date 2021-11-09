import ReactMarkdown from "react-markdown"
import DOMPurify from "dompurify"
export default function PublicEnrollFormPromotion(props) {
    return (
        <div className="pb-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">
                { props.promoTitle }
            </h2>
            <div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(props.promoContent)}}></div>
        </div>
    )
}