import { Calendar, MapPin, Sparkles, UserCheck, Wallet, Wand2, Zap } from "lucide-react";

// // --- Sub-Component: Planner Form View (Unchanged) ---
export const PlannerForm = ({ planData, setPlanData, handleGeneratePlan, loading, message }: any) => {
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
