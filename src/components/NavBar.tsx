import { Compass, PlusCircle } from "lucide-react";

interface NavProps {
    currentView: string;
    setCurrentView: (view: string) => void;
    VIEWS: { [key: string]: string };
}

export const NavBar = ({ currentView, setCurrentView, VIEWS }: NavProps) => (
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