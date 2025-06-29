
import { Pub, Course } from '../components/PubGolfContext';

const samplePubs: Pub[] = [
  { id: 1, name: "The Crown & Anchor", distance: 0.2, rating: 4.5, type: "Traditional Pub" },
  { id: 2, name: "Brewdog Bar", distance: 0.4, rating: 4.3, type: "Craft Beer" },
  { id: 3, name: "The Red Lion", distance: 0.6, rating: 4.1, type: "Sports Bar" },
  { id: 4, name: "Craft & Co", distance: 0.8, rating: 4.4, type: "Gastropub" },
  { id: 5, name: "The Barrel House", distance: 1.0, rating: 4.2, type: "Whiskey Bar" },
  { id: 6, name: "Hops & Barley", distance: 1.2, rating: 4.6, type: "Microbrewery" },
  { id: 7, name: "The Local Tavern", distance: 1.4, rating: 4.0, type: "Neighborhood Bar" },
  { id: 8, name: "Sunset Rooftop", distance: 1.6, rating: 4.7, type: "Rooftop Bar" },
  { id: 9, name: "The Underground", distance: 1.8, rating: 4.3, type: "Cocktail Lounge" }
];

const sampleCourses: Course[] = [
  {
    id: 1,
    name: "Downtown Classic",
    holes: 9,
    distance: 2.1,
    duration: 180,
    difficulty: "Medium",
    rating: 4.4,
    pubs: samplePubs.slice(0, 9)
  },
  {
    id: 2,
    name: "Brewery Trail",
    holes: 6,
    distance: 1.5,
    duration: 120,
    difficulty: "Easy",
    rating: 4.6,
    pubs: samplePubs.filter(p => p.type.includes("Brew") || p.type.includes("Craft"))
  }
];

export const fetchSamplePubs = (): Promise<Pub[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(samplePubs), 500);
    });
};

export const fetchSampleCourses = (): Promise<Course[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(sampleCourses), 500);
    });
};
