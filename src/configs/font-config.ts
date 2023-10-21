import {configureFonts} from 'react-native-paper';

const baseFont = {
  fontFamily: 'NunitoSans-Regular',
} as const;

const baseVariants = configureFonts({config: baseFont});

// Then, define custom fonts for different variants

const customVariants = {
  // Customize individual base variants:
  bodyLarge: {
    ...baseVariants.bodyLarge,
    fontFamily: 'NunitoSans-Bold',
  },
  bodyMedium: {
    ...baseVariants.bodyMedium,
    fontFamily: 'NunitoSans-SemiBold',
  },
  bodySmall: {
    ...baseVariants.bodySmall,
    fontFamily: 'Raleway-Regular',
  },
  displayLarge: {
    ...baseVariants.displayLarge,
    fontFamily: 'NunitoSans-Bold',
  },
  displayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: 'NunitoSans-SemiBold',
  },
  displaySmall: {
    ...baseVariants.displaySmall,
    fontFamily: 'Raleway-Regular',
  },
  headlineLarge: {
    ...baseVariants.headlineLarge,
    fontFamily: 'NunitoSans-Bold',
  },
  headlineMedium: {
    ...baseVariants.headlineMedium,
    fontFamily: 'NunitoSans-SemiBold',
  },
  headlineSmall: {
    ...baseVariants.headlineSmall,
    fontFamily: 'Raleway-Regular',
  },
  labelLarge: {
    ...baseVariants.labelLarge,
    fontFamily: 'NunitoSans-Bold',
  },
  labelMedium: {
    ...baseVariants.labelMedium,
    fontFamily: 'NunitoSans-SemiBold',
  },
  labelSmall: {
    ...baseVariants.labelSmall,
    fontFamily: 'Raleway-Regular',
  },
  titleLarge: {
    ...baseVariants.titleLarge,
    fontFamily: 'NunitoSans-Bold',
  },
  titleMedium: {
    ...baseVariants.titleMedium,
    fontFamily: 'NunitoSans-SemiBold',
  },
  titleSmall: {
    ...baseVariants.titleSmall,
    fontFamily: 'Raleway-Regular',
  },
  default: {
    ...baseVariants.default,
    fontFamily: 'Raleway-Regular',
  },
} as const;

// Finally, merge base variants with your custom tokens
// and apply custom fonts to your theme.

const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});

export default fonts;
