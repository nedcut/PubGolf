import React from 'react';
import { render } from '@testing-library/react-native';
import ScreenLayout from '../ScreenLayout';
import { Text } from 'react-native';

describe('ScreenLayout', () => {
  it('renders title and children', () => {
    const { getByText } = render(
      <ScreenLayout title="Test Title">
        <Text>Test Child</Text>
      </ScreenLayout>
    );

    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Child')).toBeTruthy();
  });
});