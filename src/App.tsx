import React, { useState, useEffect, useCallback } from 'react';
// Importing Lucide icons directly for use in the component
import {
    Compass, MapPin, Calendar, Wallet, Sparkles, Wand2, PlusCircle, TrendingUp,
    Landmark, Utensils, Swords, RollerCoaster, Skull, Church, Droplets,
    GalleryVerticalEnd, Sandwich, ShieldCheck, Train, Bed, Store, Plane, 
    Pizza, Forklift, Archive, IceCream2, Martini, RefreshCw, Zap, UserCheck
} from 'lucide-react';

// --- DUMMY DATA (Simulating AI output and Popular Options) ---
const dummyItinerary = {
    // Limited to 2 activities per day as requested
    1: [
        { time: '9:00 AM', activity: 'Visit the Colosseum', description: 'Explore the ancient arena and imagine gladiator battles.', icon: Landmark },
        { time: '12:00 PM', activity: 'Lunch at Ristorante Tevere', description: 'Traditional Roman carbonara near the river.', icon: Forklift },
    ],
    2: [
        { time: '10:00 AM', activity: 'Vatican City Tour', description: 'St. Peter\'s Basilica and the Vatican Museums (book tickets early!).', icon: Church },
        { time: '1:00 PM', activity: 'Pizza near the Vatican', description: 'Quick and easy lunch.', icon: Pizza },
    ],
    3: [
        { time: '9:30 AM', activity: 'Borghese Gallery and Gardens', description: 'A quieter morning enjoying Bernini sculptures and beautiful gardens.', icon: GalleryVerticalEnd },
        { time: '1:00 PM', activity: 'Picnic in the Gardens', description: 'A budget-friendly and relaxing lunch.', icon: Sandwich },
    ],
    4: [
        { time: '8:00 AM', activity: 'Day Trip to Pompeii (Train)', description: 'Full day trip to explore the ruined ancient city near Naples.', icon: Train },
        { time: '7:00 PM', activity: 'Return to Rome', description: 'Relaxing evening after a long day of walking.', icon: Bed }
    ],
    5: [
        { time: '11:00 AM', activity: 'Local Market Visit', description: 'Explore Campo de\' Fiori for local delicacies and souvenirs.', icon: Store },
        { time: '2:00 PM', activity: 'Departure Prep', description: 'Last-minute packing and heading to the airport/train station.', icon: Plane }
    ]
};

const dummyPopularOptions = [
    { name: 'Hidden Food Tour', description: 'Discover local, non-touristy food spots.', icon: Utensils, cost: '$$$' },
    { name: 'Gladiator School Experience', description: 'Learn to fight like a Roman.', icon: Swords, cost: '$$$$' },
    { name: 'Segway Tour of the Appian Way', description: 'An easy way to see the ancient road.', icon: RollerCoaster, cost: '$$' },
    { name: 'Catacombs of Callixtus', description: 'A spooky underground religious tour.', icon: Skull, cost: '$' },
];
// ----------------------------------------------------------------------

const VIEWS = {
    FORM: 'FORM',
    LOADING: 'LOADING',
    ITINERARY: 'ITINERARY',
};

// --- New Component: NavBar ---
const NavBar = ({ currentView, setCurrentView, VIEWS }) => (
    <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-teal-600 flex items-center">
                <Compass className="w-6 h-6 mr-2 text-teal-500" />
                WanderMind AI
            </a>
            {currentView === VIEWS.ITINERARY && (
                <button 
                    onClick={() => setCurrentView(VIEWS.FORM)}
                    className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-indigo-600 transition duration-300 shadow-md flex items-center text-sm"
                >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    New Plan
                </button>
            )}
        </div>
    </nav>
);

// --- Sub-Component: Day Tabs ---
const DayTabs = ({ totalDays, currentDay, setCurrentDay }) => {
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

// --- Sub-Component: Itinerary Item ---
const ItineraryItem = ({ item }) => {
    const IconComponent = item.icon;
    return (
        <div className="flex space-x-4 p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition duration-300 items-start">
            <div className="flex-shrink-0 pt-1">
                <IconComponent className="w-6 h-6 text-teal-500" />
            </div>
            <div className="flex-grow">
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

// // --- Sub-Component: Planner Form View (Unchanged) ---
const PlannerForm = ({ planData, setPlanData, handleGeneratePlan, loading, message }) => {
    const isFormValid = planData.city && planData.days && planData.budget;

    return (
        <section className="relative bg-gray-100 py-16 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                
                {/* Left: Headline */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Your Perfect Trip, <span className="text-teal-600">Instantly Planned.</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto md:mx-0">
                        Stop hours of research. WanderMind's AI crafts optimized, personalized itineraries based on your city, budget, and travel style.
                    </p>
                    <div className="flex justify-center md:justify-start items-center space-x-4 mb-8">
                        <span className="text-sm font-semibold text-gray-700 flex items-center">
                            <Zap className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" /> Lightning Fast
                        </span>
                        <span className="text-sm font-semibold text-gray-700 flex items-center">
                            <Wallet className="w-4 h-4 mr-1 text-green-500" /> Budget Optimized
                        </span>
                        <span className="text-sm font-semibold text-gray-700 flex items-center">
                            <UserCheck className="w-4 h-4 mr-1 text-blue-500" /> 100% Personalized
                        </span>
                    </div>
                </div>

                {/* Right: The Interactive Planning Form */}
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Start Your Journey</h2>
                    
                    <form onSubmit={handleGeneratePlan}>
                        
                        {/* City Preference Input */}
                        <div className="mb-5">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <MapPin className="w-4 h-4 mr-2" /> Destination City
                            </label>
                            <input
                                type="text" id="city" name="city" placeholder="e.g., Rome, Tokyo, or Coastal Spain" required
                                value={planData.city}
                                onChange={(e) => setPlanData((p: any) => ({ ...p, city: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 shadow-sm"
                            />
                        </div>
                        
                        {/* Number of Days Input */}
                        <div className="mb-5">
                            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" /> Trip Duration (Days)
                            </label>
                            <input
                                type="number" id="days" name="days" value={planData.days} min="1" max="30" required
                                onChange={(e) => setPlanData(p => ({ ...p, days: parseInt(e.target.value) || 0 }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 shadow-sm"
                            />
                        </div>

                        {/* Budget Input */}
                        <div className="mb-5">
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Wallet className="w-4 h-4 mr-2" /> Travel Budget (Total Estimated)
                            </label>
                            <select
                                id="budget" name="budget" required
                                value={planData.budget}
                                onChange={(e) => setPlanData(p => ({ ...p, budget: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 shadow-sm appearance-none bg-white"
                            >
                                <option value="" disabled>Select a budget range...</option>
                                <option value="economy">$500 - $1,500 (Economy)</option>
                                <option value="midrange">$1,501 - $4,000 (Mid-Range)</option>
                                <option value="premium">$4,001 - $10,000 (Premium)</option>
                                <option value="luxury">$10,000+ (Luxury)</option>
                            </select>
                        </div>

                        {/* Travel Style (Optional) */}
                        <div className="mb-6">
                            <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2" /> Travel Style (Optional)
                            </label>
                            <input
                                type="text" id="style" name="style" placeholder="e.g., Adventure, Relaxing Beach, History focus"
                                value={planData.style}
                                onChange={(e) => setPlanData(p => ({ ...p, style: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-200 shadow-sm"
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={!isFormValid || loading}
                            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300 shadow-lg shadow-teal-600/50 flex items-center justify-center space-x-2 disabled:bg-gray-400"
                        >
                            <Wand2 className="w-5 h-5" />
                            <span>Generate My Plan Now</span>
                        </button>
                    </form>

                    {/* Loading/Message Box */}
                    {message && (
                        <div className={`mt-4 text-center text-sm font-medium p-3 rounded-lg border bg-blue-100 text-blue-800 border-blue-300`}
                            dangerouslySetInnerHTML={{ __html: message }}
                        />
                    )}

                </div>
            </div>
        </section>
    );
};


// --- New Component: Popular Options Sidebar ---
const PopularOptions = ({ currentDay, dummyPopularOptions }) => (
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


// --- Sub-Component: Itinerary View ---
const ItineraryView = ({ planData, currentDay, setCurrentDay, dummyItinerary, dummyPopularOptions }) => {
    const totalDays = planData.days;
    const dayItinerary = dummyItinerary[currentDay] || [];

    // Format budget for display
    let budgetText = planData.budget.charAt(0).toUpperCase() + planData.budget.slice(1);
    if (planData.budget === 'economy') budgetText += ' (Low)';
    else if (planData.budget === 'luxury') budgetText += ' (High)';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

            {/* Plan Summary Header */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border-t-4 border-teal-500">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-800">{totalDays}-Day Plan for {planData.city}</h1>
                        <p className="text-gray-500">Generated by AI for {planData.city}. Ready to explore!</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-700 flex items-center bg-gray-100 p-2 rounded-lg">
                            <Wallet className="w-4 h-4 mr-1 text-green-500" />
                            {budgetText}
                        </span>
                        <span className="text-sm font-medium text-gray-700 flex items-center bg-gray-100 p-2 rounded-lg">
                            <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
                            {planData.style}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Left Column: Daily Itinerary & Day Tabs */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        
                        <DayTabs 
                            totalDays={totalDays} 
                            currentDay={currentDay} 
                            setCurrentDay={setCurrentDay} 
                        />
                        
                        {/* Itinerary Content for Selected Day */}
                        <div className="space-y-6" id="itinerary-content">
                            {dayItinerary.length === 0 ? (
                                <div className="p-6 bg-gray-50 rounded-lg text-center text-gray-500">
                                    <RefreshCw className="w-6 h-6 mx-auto mb-2 text-teal-400" />
                                    <p>No detailed itinerary found for Day {currentDay}.</p>
                                    <p className="text-xs mt-2">Try regenerating the plan or manually adding activities.</p>
                                </div>
                            ) : (
                                dayItinerary.map((item, index) => (
                                    <ItineraryItem key={index} item={item} />
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Popular Options (Now using the dedicated component) */}
                <div className="lg:col-span-1">
                    <PopularOptions 
                        currentDay={currentDay} 
                        dummyPopularOptions={dummyPopularOptions} 
                    />
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
const App = () => {
    const [currentView, setCurrentView] = useState(VIEWS.FORM);
    const [planData, setPlanData] = useState({
        city: '',
        days: 5,
        budget: '',
        style: '',
    });
    const [currentDay, setCurrentDay] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleGeneratePlan = useCallback((e) => {
        e.preventDefault();

        if (!planData.city || !planData.days || !planData.budget) {
            setMessage("Please fill in all required fields (City, Duration, and Budget).");
            return;
        }

        setLoading(true);
        setMessage(`AI is planning your ${planData.days}-day trip to <strong>${planData.city}</strong>...`);
        
        // Simulate an API call delay
        setTimeout(() => {
            setLoading(false);
            setMessage('');
            setCurrentView(VIEWS.ITINERARY);
            setCurrentDay(1); // Reset to Day 1 after generation
        }, 3000); // 3 second delay for simulation
    }, [planData]);

    const renderMainContent = () => {
        if (currentView === VIEWS.FORM) {
            return (
                <PlannerForm 
                    planData={planData} 
                    setPlanData={setPlanData} 
                    handleGeneratePlan={handleGeneratePlan} 
                    loading={loading}
                    message={message}
                />
            );
        }
        
        if (currentView === VIEWS.ITINERARY) {
            return (
                <ItineraryView 
                    planData={planData} 
                    currentDay={currentDay} 
                    setCurrentDay={setCurrentDay}
                    dummyItinerary={dummyItinerary}
                    dummyPopularOptions={dummyPopularOptions} 
                />
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* The Navigation Bar is now a dedicated component */}
            <NavBar 
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                VIEWS={VIEWS} 
            />

            <main>
                {renderMainContent()}
            </main>
        </div>
    );
};

export default App;