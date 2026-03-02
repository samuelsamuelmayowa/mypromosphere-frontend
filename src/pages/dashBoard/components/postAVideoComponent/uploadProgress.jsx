import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PropTypes from 'prop-types';


const UploadProgress = ({ progress }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Uploading video...
            </span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

UploadProgress.propTypes = {
  progress: PropTypes.any
}

export default UploadProgress;