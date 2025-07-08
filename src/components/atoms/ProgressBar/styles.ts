import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  progressBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)', // Instagram-like dimmed white background
    borderRadius: 3,
    marginHorizontal: 3,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: '#fff', // Instagram-like white progress
    height: 6,
    borderRadius: 3,
  },
});
