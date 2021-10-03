import ReactMarkdown from "react-markdown"

export default function PublicEnrollFormPromotion(props) {
    return (
        <div className="pb-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">
                { props.promoTitle }
            </h2>
            <ReactMarkdown children={ props.promoContent.replace(/\n/gi, '\n &nbsp;') } className="text-gray-700 text-sm p-2" />
        </div>
    )
}