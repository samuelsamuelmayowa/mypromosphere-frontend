import { Link } from 'react-router-dom';
import { Video, PlusSquare, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ImageVideo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center mb-4 p-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Choose Your Marketing Format
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            Promote Your Business
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue to-purple">
              With Style
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Choose between image-based or video marketing to showcase your products and services to the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Images Card */}
          <Link to="/dashboard/postAd" className="group">
            <Card className="dark:bg-darkBg h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <PlusSquare className="w-10 h-10 text-black dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-300 mb-4">
                    Promote with Images
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Create stunning visual campaigns with high-quality images that capture attention and drive engagement
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/postvideo" className="group">
            <Card className="dark:bg-darkBg h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-10 h-10 text-black dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-300 mb-4">
                    Promote with Videos
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Tell your story with compelling video content that brings your brand to life and connects with audiences
                  </p>
                  <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-gray-500 dark:text-slate-50 text-sm">
            Not sure which format to choose? Both options offer powerful ways to reach your audience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageVideo;
