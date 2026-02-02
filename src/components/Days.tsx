


interface DayProps {
    totalDays: number;
    currentDay: number;
    setCurrentDay: any;
}


export const DayTabs = ({ totalDays, currentDay, setCurrentDay } : DayProps) => {
    return (
        <div className="flex flex-wrap border-b border-gray-200 mb-6">
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
                const isActive = day === currentDay;
                return (
                    <button
                        key={day}
                        onClick={() => setCurrentDay(day)}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap focus:outline-none 
                            ${isActive
                                ? 'border-b-2 border-teal-500 text-teal-600'
                                : 'border-b-2 border-transparent text-gray-500 hover:text-teal-600 hover:border-teal-500/50'}`
                        }
                    >
                        Day {day}
                    </button>
                );
            })}
        </div>
    );
};