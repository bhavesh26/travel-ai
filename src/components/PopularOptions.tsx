import { TrendingUp } from "lucide-react";

// --- New Component: Popular Options Sidebar ---
export const PopularOptions = ({ currentDay, dummyPopularOptions }:any) => (
    <div className="sticky top-20 bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
            Popular Options
        </h3>
        <div className="space-y-4 scrollable max-h-[70vh] overflow-y-auto">
            {dummyPopularOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                    <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 hover:shadow-sm transition duration-300 cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                                <IconComponent className="w-4 h-4 mr-2 text-yellow-600" />
                                <h4 className="text-sm font-semibold text-gray-800">{option.name}</h4>
                            </div>
                            <span className="text-xs font-bold text-yellow-700">{option.cost}</span>
                        </div>
                        <p className="text-xs text-gray-600">{option.description}</p>
                        <button className="mt-2 w-full text-center text-xs font-medium text-yellow-600 bg-yellow-100 py-1 rounded-md hover:bg-yellow-200 transition">
                            Add to Day {currentDay}
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
);
