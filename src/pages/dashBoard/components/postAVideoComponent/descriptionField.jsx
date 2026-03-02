import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';

const DescriptionField = ({ description, setDescription }) => {
  return (
    <Card className="bg-white border-none dark:bg-darkBg">
      <CardHeader>
        <CardTitle className="text-lg">Description</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full p-3 bg-offwhite dark:bg-BODYDARKBG border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your product, price, condition, etc..."
        />
      </CardContent>
    </Card>
  );
};

DescriptionField.propTypes = {
  description: PropTypes.any, 
  setDescription: PropTypes.any
}

export default DescriptionField;