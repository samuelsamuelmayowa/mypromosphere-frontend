import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';

  const categories = [
       "Entertainment",
  "Shortlets & Rentals",
  "Residential and Commercial, CNG",
  "Laptops & Accessories",
  "Real Estate",
  "Phones & Tablets",
  "MUMAG CNG Storage System",
  "Fragrances & Perfumes",
  "Skincare & Beauty",
  "Groceries & Essentials",
  "Home Décor",
  "Furniture & Home Items",
  "Women's Swimwear",
  "Kids & Baby Clothing",
  "Women's Lingerie",
  "Women's Dresses",
  "Women's Shoes",
  "Pet Supplies",
  "Men's Wear",
  "Men's Shoes",
  "Men's Watches",
   
  "Women's Watches",
  "Women's Bags",
  "Jewelry & Accessories",
  "Vehicle Upgrades",
  "Automotive & Vehicles",
  "Motorcycles",
  "Apartments for Rent",
  "Fashion & Apparel",
  "Sportswear",
  "Luxury Apartments"
        ];


const CategorySelector = ({ category, setCategory }) => {
    return (
        <Card className="bg-white border-none dark:bg-darkBg">
            <CardHeader>
                <CardTitle className="text-lg">Category</CardTitle>
            </CardHeader>
            <CardContent>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-offwhite dark:bg-BODYDARKBG p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                    <option value="">Select a category...</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </CardContent>
        </Card>
    );
};

CategorySelector.propTypes = {
    category: PropTypes.any,
    setCategory: PropTypes.any
}

export default CategorySelector;