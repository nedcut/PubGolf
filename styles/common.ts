import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc' 
  },
  section: { 
    backgroundColor: 'white', 
    borderRadius: 16, 
    margin: 16, 
    padding: 16, 
    elevation: 2 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1f2937' 
  },
  button: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    width: 140,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
  },
});