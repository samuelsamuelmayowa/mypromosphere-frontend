import { Link } from "react-router-dom";
import FetchVideoseller from "../../../../hooks/fetchVideoseller";
import PropTypes from "prop-types";
import timeEdit from "../../../../utils/timeEdit";
import logo from "../../../../assets/icons/icon2.svg";


const RelatedVideos = ({ currentVideoId }) => {
  const { data: videos } = FetchVideoseller();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Other Videos</h3>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {videos?.filter((vid)=> vid.id !== currentVideoId).map(video => (
          <Link to={`/sellervideo/${video.id}`} key={video.id}>
            <div className="flex gap-3 group mb-3">
              <div className="relative flex-shrink-0 w-36 h-20 rounded-md overflow-hidden">
                <img 
                  src={logo} 
                  alt={video.description} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
                  {video?.duration}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {video?.description}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {video?.user_name}
                </p>
                <p className="text-xs text-muted-foreground jost">
                  {video?.views} {timeEdit(video?.created_at)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

RelatedVideos.propTypes = { 
    currentVideoId: PropTypes.any,
}

export default RelatedVideos;