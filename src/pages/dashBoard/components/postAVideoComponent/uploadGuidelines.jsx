import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const UploadGuidelines = () => {
  return (
    <Card className="bg-white dark:bg-darkBg border-white">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-black dark:text-mainTextDark mt-1 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-lightblue dark:text-darkblue">
              Upload Guidelines
            </p>
            <ul className="text-sm text-black dark:text-mainTextDark space-y-1">
              <li>• Maximum file size: 50MB</li>
              <li>• Supported formats: MP4, MOV, AVI</li>
              <li>• Only promotional videos are allowed</li>
              <li>• Ensure good video quality for better engagement</li>
              <li>• Share your skits, funny videos, music, and more!"</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadGuidelines;