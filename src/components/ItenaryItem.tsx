
interface ItineraryItemProps {
    item : any;
}

export const ItineraryItem = ({ item }: ItineraryItemProps) => {
    const IconComponent = item.icon;
    return (
        <div className="flex space-x-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition duration-300 items-start">
            <div className="shrink-0 pt-1">
                <IconComponent className="w-6 h-6 text-teal-500" />
            </div>
            <div className="grow">
                <p className="text-xs font-semibold text-teal-600 mb-1">{item.time}</p>
                <h4 className="text-lg font-bold text-gray-800 mb-1">{item.activity}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-2 space-x-2">
                    <button className="text-xs text-indigo-500 hover:text-indigo-700 font-medium">Edit</button>
                    <button className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                </div>
            </div>
        </div>
    );
};