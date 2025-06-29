import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PubGolfProvider, usePubGolf } from './PubGolfContext';
import { Text, TouchableOpacity } from 'react-native';

// Mock the api service
jest.mock('../../services/api', () => ({
  fetchSamplePubs: jest.fn(() => Promise.resolve([])),
  fetchSampleCourses: jest.fn(() => Promise.resolve([])),
}));

const TestComponent = () => {
  const { courses, createCourse } = usePubGolf();
  return (
    <>
      <Text testID="course-count">{courses.length}</Text>
      <TouchableOpacity onPress={() => createCourse({ name: 'Test Course', holes: 9, pubs: [], distance: 1, duration: 1, difficulty: 'Easy', rating: 5 })}>
        <Text>Add Course</Text>
      </TouchableOpacity>
    </>
  );
};

describe('PubGolfContext', () => {
  it('should add a course', () => {
    const { getByText, getByTestId } = render(
      <PubGolfProvider>
        <TestComponent />
      </PubGolfProvider>
    );

    expect(getByTestId('course-count').props.children).toBe(0);

    fireEvent.press(getByText('Add Course'));

    expect(getByTestId('course-count').props.children).toBe(1);
  });
});