import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchSampleCourses, fetchSamplePubs } from '../services/api';

// Types
export interface Pub {
  id: number;
  name: string;
  distance: number;
  rating: number;
  type: string;
  latitude: number;
  longitude: number;
}

export interface Course {
  id: number;
  name: string;
  holes: number;
  distance: number;
  duration: number;
  difficulty: string;
  rating: number;
  pubs: Pub[];
}

export interface Player {
  id: number;
  name: string;
}

export interface GameState {
  course: Course;
  players: Player[];
  scores: { [holeIndex: number]: { [playerId: number]: number } };
  currentHole: number;
}

interface PubGolfContextType {
  courses: Course[];
  activeGame: GameState | null;
  players: Player[];
  samplePubs: Pub[];
  createCourse: (courseData: Omit<Course, 'id'>) => void;
  startGame: (course: Course) => void;
  recordScore: (holeIndex: number, scores: { [playerId: number]: number }) => void;
  endGame: () => void;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  advanceHole: () => void;
}

const PubGolfContext = createContext<PubGolfContextType | undefined>(undefined);

export const PubGolfProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [samplePubs, setSamplePubs] = useState<Pub[]>([
    { id: 1, name: "The Crown & Anchor", distance: 0.2, rating: 4.5, type: "Traditional Pub", latitude: 51.5136, longitude: -0.1206 },
    { id: 2, name: "Brewdog Bar", distance: 0.4, rating: 4.3, type: "Craft Beer", latitude: 51.5194, longitude: -0.1022 },
    { id: 3, name: "The Red Lion", distance: 0.6, rating: 4.1, type: "Sports Bar", latitude: 51.5064, longitude: -0.1272 },
    { id: 4, name: "Craft & Co", distance: 0.8, rating: 4.4, type: "Gastropub", latitude: 51.5225, longitude: -0.0877 },
    { id: 5, name: "The Barrel House", distance: 1.0, rating: 4.2, type: "Whiskey Bar", latitude: 51.5107, longitude: -0.1347 },
    { id: 6, name: "Hops & Barley", distance: 1.2, rating: 4.6, type: "Microbrewery", latitude: 51.5272, longitude: -0.0556 },
    { id: 7, name: "The Local Tavern", distance: 1.4, rating: 4.0, type: "Neighborhood Bar", latitude: 51.5090, longitude: -0.1337 },
    { id: 8, name: "Sunset Rooftop", distance: 1.6, rating: 4.7, type: "Rooftop Bar", latitude: 51.5112, longitude: -0.1198 },
    { id: 9, name: "The Underground", distance: 1.8, rating: 4.3, type: "Cocktail Lounge", latitude: 51.5033, longitude: -0.1195 }
  ]);
  const [activeGame, setActiveGame] = useState<GameState | null>(null);
  const [players, setPlayers] = useState<Player[]>([{ name: 'You', id: 1 }]);

  useEffect(() => {
    const loadData = async () => {
      const [fetchedCourses, fetchedPubs] = await Promise.all([
        fetchSampleCourses(),
        fetchSamplePubs(),
      ]);
      setCourses(fetchedCourses);
      setSamplePubs(fetchedPubs);
    };
    loadData();
  }, []);

  const createCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse = { ...courseData, id: Date.now() };
    setCourses(prev => [...prev, newCourse]);
  };

  const startGame = (course: Course) => {
    setActiveGame({
      course,
      players,
      scores: {},
      currentHole: 0,
    });
  };

  const recordScore = (holeIndex: number, scores: { [playerId: number]: number }) => {
    if (activeGame) {
      setActiveGame(prev => {
        if (!prev) return null;
        const newScores = { ...prev.scores, [holeIndex]: scores };
        return { ...prev, scores: newScores };
      });
    }
  };

  const advanceHole = () => {
    if (activeGame && activeGame.currentHole < activeGame.course.holes - 1) {
      setActiveGame(prev => {
        if (!prev) return null;
        return { ...prev, currentHole: prev.currentHole + 1 };
      });
    }
  };

  const endGame = () => {
    setActiveGame(null);
  };

  return (
    <PubGolfContext.Provider value={{ courses, activeGame, players, samplePubs, createCourse, startGame, recordScore, endGame, setPlayers, advanceHole }}>
      {children}
    </PubGolfContext.Provider>
  );
};

export function usePubGolf() {
  const ctx = useContext(PubGolfContext);
  if (!ctx) throw new Error('usePubGolf must be used within a PubGolfProvider');
  return ctx;
} 