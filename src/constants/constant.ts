
import {
   
    Landmark, Church, 
    GalleryVerticalEnd, Sandwich,Train, Bed, Store, Plane, 
    Pizza, Forklift, Utensils , Swords , RollerCoaster , Skull
} from 'lucide-react';

 export const dummyItinerary = {
    
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

export const dummyPopularOptions = [
    { name: 'Hidden Food Tour', description: 'Discover local, non-touristy food spots.', icon: Utensils, cost: '$$$' },
    { name: 'Gladiator School Experience', description: 'Learn to fight like a Roman.', icon: Swords, cost: '$$$$' },
    { name: 'Segway Tour of the Appian Way', description: 'An easy way to see the ancient road.', icon: RollerCoaster, cost: '$$' },
    { name: 'Catacombs of Callixtus', description: 'A spooky underground religious tour.', icon: Skull, cost: '$' },
];
// ----------------------------------------------------------------------

export const VIEWS = {
    FORM: 'FORM',
    LOADING: 'LOADING',
    ITINERARY: 'ITINERARY',
};
