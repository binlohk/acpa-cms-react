import ReactMarkdown from "react-markdown"
import {Parser} from "html-to-react";
import DOMPurify from "dompurify";
export default function PublicEnrollFormPromotion(props) {
    
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
    if (props.promoContent) {
        var value = extractUrlValue('url', props.promoContent);
        if(value){
            var ViToken = GetyouTubeVideoToken(value);    
        }
        
    }
    
    return (
        <div className="pb-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800 p-2">
                { props.promoTitle }
            </h2>
            <div className="pb-5" >
                {Parser().parse(DOMPurify.sanitize(props.promoContent))}
            </div>
               {
                    ViToken ? <>
                        <iframe
                        width="600"
                        height="300"
                        src={`https://www.youtube.com/embed/${ViToken}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                        />
                    </> : ''
                }
        </div>
    )
}