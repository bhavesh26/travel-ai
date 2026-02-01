// import { useState  , useCallback} from "react";
// import { NavBar } from "./App.tsx';

// export const HomeScreen = () => {
//      const [currentView, setCurrentView] = useState(VIEWS.FORM);
//         const [planData, setPlanData] = useState({
//             city: '',
//             days: 5,
//             budget: '',
//             style: '',
//         });
//         const [currentDay, setCurrentDay] = useState(1);
//         const [loading, setLoading] = useState(false);
//         const [message, setMessage] = useState('');
    
//         const handleGeneratePlan = useCallback((e) => {
//             e.preventDefault();
    
//             if (!planData.city || !planData.days || !planData.budget) {
//                 setMessage("Please fill in all required fields (City, Duration, and Budget).");
//                 return;
//             }
    
//             setLoading(true);
//             setMessage(`AI is planning your ${planData.days}-day trip to <strong>${planData.city}</strong>...`);
            
//             // Simulate an API call delay
//             setTimeout(() => {
//                 setLoading(false);
//                 setMessage('');
//                 setCurrentView(VIEWS.ITINERARY);
//                 setCurrentDay(1); // Reset to Day 1 after generation
//             }, 3000); // 3 second delay for simulation
//         }, [planData]);
    
//         const renderMainContent = () => {
//             if (currentView === VIEWS.FORM) {
//                 return (
//                     <PlannerForm 
//                         planData={planData} 
//                         setPlanData={setPlanData} 
//                         handleGeneratePlan={handleGeneratePlan} 
//                         loading={loading}
//                         message={message}
//                     />
//                 );
//             }
            
//             // if (currentView === VIEWS.ITINERARY) {
//             //     return (
//             //         <ItineraryView 
//             //             planData={planData} 
//             //             currentDay={currentDay} 
//             //             setCurrentDay={setCurrentDay}
//             //             dummyItinerary={dummyItinerary}
//             //             dummyPopularOptions={dummyPopularOptions} 
//             //         />
//             //     );
//             // }
//             return null;
//         };
    
//         return (
//             <div className="min-h-screen bg-gray-100">
//                 {/* The Navigation Bar is now a dedicated component */}
//                 <NavBar 
//                     currentView={currentView} 
//                     setCurrentView={setCurrentView} 
//                     VIEWS={VIEWS} 
//                 />
    
//                 <main>
//                     {renderMainContent()}
//                 </main>
//             </div>
//         );
//     };
